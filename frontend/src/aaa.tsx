
// // frontend/
// // ├── src/
// // │   ├── components/
// // │   ├── pages/
// // │   ├── slices/
// // │   ├── store/
// // │   ├── App.tsx
// // │   ├── index.tsx
// // └── package.json

// קובץ index.tsx

// // src/index.tsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import App from '../../back/src/App';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// // Store

// // src/store/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../slices/userSlice';
// import missileReducer from '../slices/missileSlice';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     missile: missileReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // User Slice

// // src/slices/userSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface UserState {
//   username: string;
//   organization: string;
//   region?: string;
// }

// const initialState: UserState = {
//   username: '',
//   organization: '',
//   region: '',
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
    // setUser(state, action: PayloadAction<UserState>) {
    //   state.username = action.payload.username;
    //   state.organization = action.payload.organization;
    //   state.region = action.payload.region;
    // },
    // logout(state) {
    //   state.username = '';
    //   state.organization = '';
    //   state.region = '';
//     },
//   },
// });

// export const { setUser, logout } = userSlice.actions;
// export default userSlice.reducer;

// // Missile Slice

// // src/slices/missileSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { AppDispatch } from '../store/store';

// interface Missile {
//   id: string;
//   name: string;
//   speed: number;
//   description: string;
// }

// interface MissileState {
//   missiles: Missile[];
// }

// const initialState: MissileState = {
//   missiles: [],
// };

// const missileSlice = createSlice({

//   name: 'missile',
//   initialState,
//   reducers: {
//     setMissiles(state, action: PayloadAction<Missile[]>) {
//       state.missiles = action.payload;
//     },
//   },
// });

// export const { setMissiles } = missileSlice.actions;

// export const fetchMissiles = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/missiles');
//     dispatch(setMissiles(response.data));
//   } catch (error) {
//     console.error('Failed to fetch missiles', error);
//   }
// };

// export default missileSlice.reducer;


// App.tsx

// // src/App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AttackPage from './pages/AttackPage';
// import DefensePage from './pages/DefensePage';
// import WeaponStore from './pages/WeaponStore';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';

// function App() {
//   const { organization } = useSelector((state: RootState) => state.user);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {organization === 'IDF' ? (
//           <Route path="/defense" element={<DefensePage />} />
//         ) : (
//           <Route path="/attack" element={<AttackPage />} />
//         )}
//         <Route path="/store" element={<WeaponStore />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// Login Page

// // src/pages/Login.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../slices/userSlice';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
    // try {
    //   const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    //   dispatch(setUser(res.data.user));
    //   navigate(res.data.user.organization === 'IDF' ? '/defense' : '/attack');
    // } catch (err) {
    //   console.error(err);
    // }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>כניסה</h2>
//       <input type="text" placeholder="שם משתמש" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">התחבר</button>
//       <button onClick={() => navigate('/register')}>הרשמה</button>
//     </form>
//   );
// };

// export default Login;

// Register Page

// // src/pages/Register.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [organization, setOrganization] = useState('');
//   const [region, setRegion] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         username,
//         password,
//         organization,
//         region: organization === 'IDF' ? region : undefined,
//       });
//       navigate('/');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>הרשמה</h2>
//       <input type="text" placeholder="שם משתמש" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
//         <option value="">בחר ארגון</option>
//         <option value="IDF">IDF</option>
//         <option value="Hamas">Hamas</option>

// name: 'missile',
//   initialState,
//   reducers: {
//     setMissiles(state, action: PayloadAction<Missile[]>) {
//       state.missiles = action.payload;
//     },
//   },
// });

// export const { setMissiles } = missileSlice.actions;

// export const fetchMissiles = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/missiles');
//     dispatch(setMissiles(response.data));
//   } catch (error) {
//     console.error('Failed to fetch missiles', error);
//   }
// };

// export default missileSlice.reducer;

// רכיבים ודפים

// App.tsx

// // src/App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AttackPage from './pages/AttackPage';
// import DefensePage from './pages/DefensePage';
// import WeaponStore from './pages/WeaponStore';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';

// function App() {
//   const { organization } = useSelector((state: RootState) => state.user);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {organization === 'IDF' ? (
//           <Route path="/defense" element={<DefensePage />} />
//         ) : (
//           <Route path="/attack" element={<AttackPage />} />
//         )}
//         <Route path="/store" element={<WeaponStore />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// Login Page

// // src/pages/Login.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../slices/userSlice';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
//       dispatch(setUser(res.data.user));
//       navigate(res.data.user.organization === 'IDF' ? '/defense' : '/attack');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>כניסה</h2>
//       <input type="text" placeholder="שם משתמש" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">התחבר</button>
//       <button onClick={() => navigate('/register')}>הרשמה</button>
//     </form>
//   );
// };

// export default Login;

// Register Page

// // src/pages/Register.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [organization, setOrganization] = useState('');
//   const [region, setRegion] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         username,
//         password,
//         organization,
//         region: organization === 'IDF' ? region : undefined,
//       });
//       navigate('/');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <h2>הרשמה</h2>
//       <input type="text" placeholder="שם משתמש" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
//         <option value="">בחר ארגון</option>
//         <option value="IDF">IDF</option>
//         <option value="Hamas">Hamas</option>
// <option value="Hezbollah">Hezbollah</option>
//         {/* הוסף ארגונים נוספים */}
//       </select>
//       {organization === 'IDF' && (
//         <select value={region} onChange={(e) => setRegion(e.target.value)}>
//           <option value="">בחר אזור</option>
//           <option value="North">צפון</option>
//           <option value="South">דרום</option>
//           <option value="Center">מרכז</option>
//           <option value="West Bank">יהודה ושומרון</option>
//         </select>
//       )}
//       <button type="submit">הירשם</button>
//     </form>
//   );
// };

// export default Register;

// Attack Page

// // src/pages/AttackPage.tsx
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store/store';
// import { fetchMissiles } from '../slices/missileSlice';

// const AttackPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const { missiles } = useSelector((state: RootState) => state.missile);
//   const { organization } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     dispatch(fetchMissiles());
//   }, [dispatch]);

//   // לוגיקה נוספת לשיגור טילים תתווסף כאן

//   return (
//     <div>
//       <h2>ארגון: {organization}</h2>
//       <h3>טילים זמינים:</h3>
//       <ul>
//         {missiles.map((missile) => (
//           <li key={missile.id}>{missile.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AttackPage;

// Defense Page

// // src/pages/DefensePage.tsx
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store/store';
// import { fetchMissiles } from '../slices/missileSlice';

// const DefensePage: React.FC = () => {
//   const dispatch = useDispatch();
//   const { missiles } = useSelector((state: RootState) => state.missile);
//   const { organization, region } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     dispatch(fetchMissiles());
//   }, [dispatch]);

//   // לוגיקה נוספת ליירוט טילים תתווסף כאן

//   return (
//     <div>
//       <h2>ארגון: {organization}</h2>
//       <h3>אזור: {region}</h3>
//       <h3>טילים זמינים להגנה:</h3>
//       <ul>
//         {missiles.map((missile) => (
//           <li key={missile.id}>{missile.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DefensePage;

// Weapon Store Page

// // src/pages/WeaponStore.tsx
// import React from 'react';

// const WeaponStore: React.FC = () => {
//   // לוגיקה לרכישת נשקים תתווסף כאן

//   return (
//     <div>
//       <h2>חנות נשק</h2>
//       {/* הצגת התקציב ונשקים זמינים */}
//     </div>
//   );
// };

// export default WeaponStore;

// סיכום

// הקוד נכתב ללא שימוש בטוקנים, והאימות מתבצע ללא צורך בהם. ה-Backend וה-Frontend הותאמו לכך, והקוד סודר ומחולק לקבצים בצורה ברורה, כך שתוכל להתמצא בו בקלות.

// אם יש לך שאלות נוספות או שאתה זקוק לעזרה נוספת, אל תהסס לפנות!
