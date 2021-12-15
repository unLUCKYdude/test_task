import { useEffect, useRef, useState } from 'react';
import { loadText } from './functions';
import TextContainer from './TextContainer';
import './App.css';

function App() {

    const [text, setText] = useState(null);
    const [pos, setPos] = useState(0);
    const [missed, setMissed] = useState(false);
    const [misses, setMisses] = useState(0);
    const [secondsPassed, setSecondsPassed] = useState(0);
    const intervalID = useRef(null);

    const init = async () => {
        const res = await loadText();
        if (!res) return;
        setText(res);
    }

    const charHandler = ({ key }) => {
        if (key.length > 1 || pos == text.length) return;
        const charCode = key.charCodeAt();
        if (!(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || charCode == 45 || charCode == 32 || charCode >= 48 && charCode <= 57)) return;
        if (key != text[pos]) {
            if (missed) {
                return;
            }
            setMissed(true);
            setMisses(prev => prev + 1);
            return;
        }
        setMissed(false);
        setPos(prev => prev + 1);
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        setPos(0);
        setMissed(false);
    }, [text]);

    useEffect(() => {
        if (!text) return;
        window.addEventListener("keyup", charHandler);
        return () => window.removeEventListener("keyup", charHandler);
    }, [text, pos, missed]);

    useEffect(() => {
        if (!text) return;
        if (pos == 1) {
            intervalID.current = setInterval(() => {
                setSecondsPassed(prev => prev + 0.5);
            }, 500);
            return;
        }
        if (pos == text.length) {
            clearInterval(intervalID.current);
        }
    }, [pos]);

    const speed = !secondsPassed ? 0 : 60 * pos / secondsPassed;
    const precision = text ? 100 * (1 - misses / text.length) : 100;

    return <div className="App">
        <TextContainer text={text} pos={pos} refresText={init} missed={missed} precision={precision.toFixed(1)} speed={Math.floor(speed)} />
    </div>
}

export default App;