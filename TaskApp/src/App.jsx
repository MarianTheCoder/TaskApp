import React, { useContext } from 'react';
import { AuthProvider} from './components/other/context/AuthContext';
import WrapperLogin from './components/login/WrapperLogin';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { NameProvider } from './components/other/context/NameContext';
import { DateProvider } from './components/other/context/DateContext';
import { TasksProvider } from './components/other/context/TasksContext';
import { EditProvider } from './components/other/context/EditContext';
import { PutTimeProvider } from './components/other/context/PutTimeContext';
import { FocusProvider } from './components/Sections/Focus/FocusGetContext';
import { NoteProvider } from './components/Sections/Notes/NoteContext';

const App = () => {
  

    return (
        <AuthProvider> 
          <NameProvider>
            <DateProvider>
              <TasksProvider>
                <EditProvider>
                  <PutTimeProvider>
                    <FocusProvider>
                      <NoteProvider>
                <Router>
                <div className='h-screen w-screen grid grid-rows-[auto_1fr]  lg:grid-cols-[220px_1fr] lg:grid-rows-1'>
                   <Navbar/>
                   <WrapperLogin/>
                </div>
                </Router>
                </NoteProvider>
                </FocusProvider>
                  </PutTimeProvider>
                </EditProvider>
              </TasksProvider>
            </DateProvider>
          </NameProvider>
        </AuthProvider>
    );
};



export default App;
