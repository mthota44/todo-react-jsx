import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PropsDemo from './components/PropsDemo';
import HooksMenu from './components/HooksMenu';
import UseStateDemo from './components/hooks/UseStateDemo';
import UseEffectDemo from './components/hooks/UseEffectDemo';
import UseRefDemo from './components/hooks/UseRefDemo';
import UseContextDemo from './components/hooks/UseContextDemo';
import UseReducerDemo from './components/hooks/UseReducerDemo';
import UseMemoDemo from './components/hooks/UseMemoDemo';
import UseCallbackDemo from './components/hooks/UseCallbackDemo';
import FormsMenu from './components/FormsMenu';
import AuthForms from './components/forms/AuthForms';
import NestedForm from './components/forms/NestedForm';
import UncontrolledForm from './components/forms/UncontrolledForm';
import ReactHookFormDemo from './components/forms/ReactHookFormDemo';
import Carousel from './components/Carousel';
import BasicsMenu from './components/BasicsMenu';
import ShallowDeepCopy from './components/basics/ShallowDeepCopy';
import ReferentialIntegrity from './components/basics/ReferentialIntegrity';
import DeclarativeVsImperative from './components/basics/DeclarativeVsImperative';
import DataFlow from './components/basics/DataFlow';
import LifecycleConcept from './components/basics/LifecycleConcept';
import FunctionalProgramming from './components/basics/FunctionalProgramming';
import ControlledInputDemo from './components/basics/ControlledInputDemo';
import StateBatching from './components/basics/StateBatching';
import PythonBasics from './components/PythonBasics';
import TodoApp from './components/todo-app/TodoApp';
import './App.css';

// Simple Home Component with Navigation
function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Concepts</h1>
      <nav>
        <ul>
          <li><Link to="/basics">Basics</Link></li>
          <li><Link to="/props">Props</Link></li>
          <li><Link to="/hooks">Hooks</Link></li>
          <li><Link to="/forms">Forms</Link></li>
          <li><Link to="/carousel">Carousel Demo</Link></li>
          <li><Link to="/python-basics">Python Basics</Link></li>
          <li><Link to="/todo-app">Todo App</Link></li>
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

        <Route path="/basics" element={<BasicsMenu />} />
        <Route path="/basics/shallow-deep-copy" element={<ShallowDeepCopy />} />
        <Route path="/basics/referential-integrity" element={<ReferentialIntegrity />} />
        <Route path="/basics/declarative" element={<DeclarativeVsImperative />} />
        <Route path="/basics/data-flow" element={<DataFlow />} />
        <Route path="/basics/lifecycle" element={<LifecycleConcept />} />
        <Route path="/basics/functional" element={<FunctionalProgramming />} />
        <Route path="/basics/controlled" element={<ControlledInputDemo />} />
        <Route path="/basics/batching" element={<StateBatching />} />

        {/* Module 2: Props */}
        <Route path="/props" element={<PropsDemo />} />

        {/* Module 4: Hooks */}
        <Route path="/hooks" element={<HooksMenu />} />
        <Route path="/hooks/usestate" element={<UseStateDemo />} />
        <Route path="/hooks/useeffect" element={<UseEffectDemo />} />
        <Route path="/hooks/useref" element={<UseRefDemo />} />
        <Route path="/hooks/usecontext" element={<UseContextDemo />} />
        <Route path="/hooks/usereducer" element={<UseReducerDemo />} />
        <Route path="/hooks/usememo" element={<UseMemoDemo />} />
        <Route path="/hooks/usecallback" element={<UseCallbackDemo />} />

        {/* Module 3: Forms */}
        <Route path="/forms" element={<FormsMenu />} />
        <Route path="/forms/auth" element={<AuthForms />} />
        <Route path="/forms/nested" element={<NestedForm />} />
        <Route path="/forms/uncontrolled" element={<UncontrolledForm />} />
        <Route path="/forms/hook-form" element={<ReactHookFormDemo />} />

        {/* Simple Carousel */}
        <Route path="/carousel" element={<Carousel />} />

        {/* Python Basics */}
        <Route path="/python-basics" element={<PythonBasics />} />

        {/* Todo App */}
        <Route path="/todo-app" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
