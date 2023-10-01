import './App.css';
import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import React from "react";
import TripsPage from "./components/TripsPage";
import TripPage from './components/TripPage';
import BottomBar from "./components/BottomBar/BottomBar";
import TopNav from "./components/TopNav/TopNav";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import FriendsPage from "./components/FriendsPage/FriendsPage";
import MapPage from "./components/MapPage/MapPage";
import SearchPage from "./components/SearchPage/SearchPage";
import AuthProvider from './components/AuthContext';
import DestinationPage from './components/DestinationPage/DestinationPage';
import DestinationOnly from './components/DestinationOnly/DestinationOnly';
import FriendshipPage from './components/FriendshipPage/FriendshipPage';
import PostsPage from './components/PostsPage/PostsPage';
import PostPage from './components/PostPage/PostPage';


function App() {
    return (
        <div className="App">
            <AuthProvider>
            <HashRouter>
                <div className="App__content">
                    <TopNav /> 
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/trips" element={<TripsPage />} />
                        <Route exact path="/trips/:tripId" element={<TripPage />} />
                        <Route exact path="/trips/:tripId/destinations" element={<TripPage />} />
                        <Route exact path="/friends" element={<FriendsPage />} />
                        <Route exact path="/map" element={<MapPage />} />
                        <Route exact path="/search" element={<SearchPage />} />
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route path="/trips/:tripId/destination" element= {<DestinationPage />}/>
                        <Route path="/trips/:tripId/destinations/:destinationId" element= {<DestinationOnly />}/>
                        <Route path="/friendship/:friendshipToken" element={<FriendshipPage />} />
                        <Route path="/trips/:tripId/posts" element={<PostsPage />} />
                        <Route path="/trips/:tripId/posts/:postId" element={<PostPage />} />
                    </Routes>
                </div>
                <BottomBar />
            </HashRouter>
            </AuthProvider>
        </div>

    );
}

export default App;
