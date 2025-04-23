import { useState } from 'preact/hooks';

export function Options() {
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [modelName, setModelName] = useState('');

    const handleSave = () => {
        // Save the settings to local storage or any other storage mechanism
        localStorage.setItem('apiEndpoint', apiEndpoint);
        localStorage.setItem('apiKey', apiKey);
        localStorage.setItem('modelName', modelName);
        alert('Settings saved!');
    };

    return (
        <div>
            <h1>Extension Options</h1>
            <div>
                <label>
                    API Endpoint:
                    <input
                        type="text"
                        value={apiEndpoint}
                        onInput={(e) => setApiEndpoint(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    API Key:
                    <input
                        type="text"
                        value={apiKey}
                        onInput={(e) => setApiKey(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Model Name:
                    <input
                        type="text"
                        value={modelName}
                        onInput={(e) => setModelName(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleSave}>Save Settings</button>
        </div>
    );
}