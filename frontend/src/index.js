import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PointerFollowerPage } from './components/pages/pointerFollowerPage';
import { Header } from './components/header/header';
import { MoviesPage } from './components/pages/moviesPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header></Header>
            <h1 style={{ color: "white", textAlign: "center" }}>Inicio</h1>
          </>

        } />

        <Route path='/movies' element={
          <MoviesPage></MoviesPage>
        }></Route>



        <Route path="/pointerFollower" element={
          <PointerFollowerPage />
        } />
        <Route path="/tictactoe" element={
          <>
            <h1>tictactoe</h1>
          </>
        } />
        <Route path="/twitterFollowCardd" element={
          <>
            <h1>twitterFollowCardd</h1>
          </>
        } />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


