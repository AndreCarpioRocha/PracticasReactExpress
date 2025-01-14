import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PointerFollowerPage } from './components/pages/pointerFollowerPage';
import { Header } from './components/header/header';
import { MoviesPage } from './components/pages/moviesPage';
import { MainTitle } from './components/titles/mainTitle';
import { TictactoePage } from './components/pages/tictactoePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header></Header>
            <MainTitle title="Pagina de Inicio" ></MainTitle>
          </>
        } />

        <Route path='/moviesStore' element={
          <MoviesPage></MoviesPage>
        }></Route>

        <Route path="/pointerFollower" element={
          <PointerFollowerPage />
        } />

        <Route path="/tictactoe" element={
          <TictactoePage></TictactoePage>
        } />

        <Route path="/twitterFollowCard" element={
          <>
            <Header></Header>
            <h1>twitterFollowCardd</h1>
          </>
        } />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


