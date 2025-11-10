# Dobby-AJ

Dobby-AJ is a tool designed to integrate the AI model `dobby-unhinged-llama-3-3-70b-new` from `accounts/sentientfoundation/models` with the Directory of Open Access Journals (DOAJ). It automates the processing, analysis, and management of DOAJ data using advanced AI capabilities.

## Key Features

* AI-driven analysis and automation using `dobby-unhinged-llama-3-3-70b-new`
* Streamlines DOAJ data extraction, classification, and reporting
* Modular structure: agent, services, and config
* Easy configuration via `.env` or `config` folder
* Ready to run in Node.js / JavaScript environments

## Technologies Used

* Node.js / JavaScript (plain JS)
* Folder structure:

  * `agent/` – main agent code interfacing with the AI model and DOAJ
  * `services/` – supporting services for preprocessing, DOAJ API requests, and postprocessing
  * `config/` – configuration files including model and DOAJ settings
* `.env.example` for environment variable template

## Installation

```bash
git clone https://github.com/rawakinode/dobby-aj.git
cd dobby-aj
cp .env.example .env  # edit .env with your model API key and DOAJ settings
npm install
```

## Configuration

1. Open `.env` and provide your model credentials and DOAJ API settings:

   ```
   MODEL_NAME=dobby-unhinged-llama-3-3-70b-new
   API_KEY=your_api_key
   DOAJ_ENDPOINT=https://doaj.org/api/v2/
   ```
2. Adjust configuration in `config/` (batch size, model parameters, retry settings).
3. (Optional) Set up a cron job or service manager (systemd, pm2) to run continuously.

## Usage

Run the application:

```bash
npm start
```

Or directly:

```bash
node app.js
```

*(Replace with your actual entry point if different)*

### Workflow

1. Agent initializes the `dobby-unhinged-llama-3-3-70b-new` model.
2. Agent retrieves and processes data from DOAJ.
3. The AI model analyzes, classifies, and generates insights or reports.
4. `services/` modules handle data formatting, logging, and storage.
5. Error handling includes retries and optional notifications.

## Folder Structure

```
/agent        ← code to interface with AI model and DOAJ API
/services     ← preprocessing, DOAJ requests, postprocessing
/config       ← app, model, and DOAJ configuration
.env.example  ← environment variable template
app.js        ← main entry point
package.json
```

## Contributing

1. Fork this repository
2. Create a branch for your feature: `git checkout -b new-feature`
3. Commit changes: `git commit -m "Add new feature..."`
4. Push to your branch: `git push origin new-feature`
5. Open a Pull Request and describe your changes

## License

This project is licensed under the MIT License.
