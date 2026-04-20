import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CertificationsList from './pages/CertificationsList'
import CertificationDetail from './pages/CertificationDetail'
import TrainingList from './pages/TrainingList'
import TrainingDetail from './pages/TrainingDetail'
import ResourcesList from './pages/ResourcesList'
import ResourceDetail from './pages/ResourceDetail'
import NewsList from './pages/NewsList'
import NewsDetail from './pages/NewsDetail'
import AccountPage from './pages/AccountPage'
import ApiDemo from './pages/ApiDemo'
import MembershipPage from './pages/MembershipPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certifications" element={<CertificationsList />} />
        <Route path="/certifications/:slug" element={<CertificationDetail />} />
        <Route path="/training" element={<TrainingList />} />
        <Route path="/training/:slug" element={<TrainingDetail />} />
        <Route path="/resources" element={<ResourcesList />} />
        <Route path="/resources/:slug" element={<ResourceDetail />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/demo" element={<ApiDemo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
