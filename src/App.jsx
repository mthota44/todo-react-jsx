import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PropsDemo from './components/PropsDemo';
import HooksMenu from './components/HooksMenu';
import UseStateDemo from './components/hooks/UseStateDemo';
import UseEffectDemo from './components/hooks/UseEffectDemo';
import UseRefDemo from './components/hooks/UseRefDemo';
import UseContextDemo from './components/hooks/UseContextDemo';
import UseReducerDemo from './components/hooks/UseReducerDemo';
import UseMemoCallbackDemo from './components/hooks/UseMemoCallbackDemo';
import FormsMenu from './components/FormsMenu';
import AuthForms from './components/forms/AuthForms';
import NestedForm from './components/forms/NestedForm';
import UncontrolledForm from './components/forms/UncontrolledForm';
import './App.css';

// Simple Home Component with Navigation
function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Concepts</h1>
      <nav>
        <ul>
          <li><Link to="/props">Props</Link></li>
          <li><Link to="/hooks">Hooks</Link></li>
          <li><Link to="/forms">Forms</Link></li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Module 2: Props */}
        <Route path="/props" element={<PropsDemo />} />

        {/* Module 4: Hooks */}
        <Route path="/hooks" element={<HooksMenu />} />
        <Route path="/hooks/usestate" element={<UseStateDemo />} />
        <Route path="/hooks/useeffect" element={<UseEffectDemo />} />
        <Route path="/hooks/useref" element={<UseRefDemo />} />
        <Route path="/hooks/usecontext" element={<UseContextDemo />} />
        <Route path="/hooks/usereducer" element={<UseReducerDemo />} />
        <Route path="/hooks/usememo" element={<UseMemoCallbackDemo />} />

        {/* Module 3: Forms */}
        <Route path="/forms" element={<FormsMenu />} />
        <Route path="/forms/auth" element={<AuthForms />} />
        <Route path="/forms/nested" element={<NestedForm />} />
        <Route path="/forms/uncontrolled" element={<UncontrolledForm />} />
      </Routes>
    </Router>
  );
}

export default App;
