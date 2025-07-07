const express = require('express'); // expressjs
const multer = require('multer');
const { ZBClient } = require('zeebe-node');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;

const zbc = new ZBClient('http://localhost:26500');

app.use(express.json());

app.get('/',async (req, res) => {
    res.json("camunda8-node-service running on port 3000!")
})

// Deploy a BPMN file
app.post('/deploy', upload.single('bpmn'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No BPMN file uploaded.' });
  }

  const bpmnPath = req.file.path;
  const originalName = req.file.originalname;

  console.log(`Received file: ${originalName}, saved to: ${bpmnPath}`);
  // Validate extension
  if (path.extname(originalName) !== '.bpmn') {
    fs.unlinkSync(bpmnPath); // delete temp file
    return res.status(400).json({ error: 'Only .bpmn files are allowed.' });
  }

  try {
    const result = await zbc.deployProcess({
      definition: fs.readFileSync(bpmnPath),
      name: originalName
    });

    fs.unlinkSync(bpmnPath); // clean up temp file
    console.log(`Deployed BPMN process: ${originalName}`);
    res.status(200).json({ deployed: result.processes });
  } catch (err) {
    fs.unlinkSync(bpmnPath); // clean up on error too
    res.status(500).json({ error: err.message });
  }
});

// Start a process instance
app.post('/start/:processId', async (req, res) => {
  const { processId } = req.params;
  const variables = req.body || {};
  try {
    console.log("Starting process with process instance ID:", processId);
    const result = await zbc.createProcessInstanceWithResult({
      bpmnProcessId: processId,
      variables
    });
    res.json({ instance: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Zeebe job worker
zbc.createWorker({
  taskType: 'node-task',
  taskHandler: async (job) => {
    console.log('Job received:', job.variables);
    const result = { success: true, original: job.variables };
    return job.complete(result);
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
