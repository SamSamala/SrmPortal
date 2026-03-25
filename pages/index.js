// Entry page — dynamically imports App with SSR disabled
import dynamic from 'next/dynamic';
const App = dynamic(() => import('../components/App'), { ssr: false });
export default function Page() { return <App />; }
