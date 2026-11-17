//your JS code here. If required.
function App() {
    const [elementCount, setElementCount] = React.useState(0);
    const [memoryUsage, setMemoryUsage] = React.useState(0);

    const updateMemory = () => {
        if (performance && performance.memory) {
            const usedMB = performance.memory.usedJSHeapSize / (1024 * 1024);
            setMemoryUsage(usedMB.toFixed(2));
            return usedMB;
        }
        return 0;
    };

    React.useEffect(() => {
        updateMemory();
    }, [elementCount]);

    const handleGenerate = () => {
        setElementCount(10000);
        setTimeout(() => {
            const currentMemory = updateMemory();
            if (currentMemory > 50) {
                alert("Memory usage exceeded 50 MB! Please optimize actions to reduce memory consumption.");
            }
        }, 100);
    };

    const handleRemove = () => {
        setElementCount(0);
        setTimeout(() => {
            updateMemory();
        }, 100);
    };

    return (
        <div className="app-container">
            <h1>Memory Management Tool</h1>
            <div>
                <button id="generate" onClick={handleGenerate}>Generate Elements</button>
                <button id="remove" onClick={handleRemove}>Remove Elements</button>
            </div>
            <p id="memory-usage">Memory Usage: {memoryUsage} MB</p>
            <div id="container">
                {Array.from({ length: elementCount }).map((_, index) => (
                    <div key={index} className="generated-div"></div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));