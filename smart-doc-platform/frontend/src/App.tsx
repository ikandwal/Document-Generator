import { Routes, Route } from 'react-router-dom';
import HomeInput from './pages/HomeInput';
import Configure from './pages/Configure';
import AgentProgress from './pages/AgentProgress';
import PreviewExport from './pages/PreviewExport';
import Library from './pages/Library';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Archive from './pages/Archive';
import Login from './pages/Login';
import { Layout } from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomeInput />} />
        <Route path="/configure" element={<Configure />} />
        <Route path="/progress" element={<AgentProgress />} />
        <Route path="/preview" element={<PreviewExport />} />
        <Route path="/library" element={<Library />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/archive" element={<Archive />} />
      </Route>
    </Routes>
  );
}

export default App;
