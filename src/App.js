import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Jumbo from "./Components/Jumbo";
import MainComponent from "./Components/MainComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useEffect, useState} from "react";

function App() {

    const [restaurantItems, setRestaurantItems] = useState([]);
    const jumboTitleInit = 'Food. Delivered.';
    const jumboTextInit = 'Order your favourite food from local restaurants, right to your door.';
    const [jumboTitle, setJumboTitle] = useState(jumboTitleInit);
    const [jumboText, setJumboText] = useState(jumboTextInit);
    const [restaurantID, setRestaurantID] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);
    const [showingRestaurants, setShowingRestaurants] = useState('d-block');
    const [showingChangeButton, setShowingChangeButton] = useState('d-none');
    const [showingMenuItems, setShowingMenuItems] = useState('d-block');

    useEffect(() => {

        if (restaurantID === '') {
            return;
        }

        fetchMenu()
            .then((menuData) => {
                setMenuItems(menuData);
                setFilteredMenuItems(menuData);
                setJumboTitle(menuData.restaurant);
                setJumboText('');
                setShowingRestaurants('d-none');
                setShowingChangeButton('d-block');
                setShowingMenuItems('d-block');
            })
            .catch((e) => {
                console.log(e.message);
            })
    },
        [restaurantID]
    );

    const fetchMenu = async () => {

        const response = await fetch('http://localhost:8080/restaurants/' + restaurantID);

        if (!response.ok) {
            throw new Error('Data could not be fetched.')
        }

        return await response.json();
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/restaurants');

        if (!response.ok) {
            throw new Error('Data could not be fetched.')
        }

        return await response.json();
    }

    useEffect(() => {
            fetchData()
                .then((restaurantData) => {
                    setRestaurantItems(restaurantData);
                })
                .catch((e) => {
                    console.log(e.message);
                })
        }, []
    );


    function handleBackButton() {
        setShowingMenuItems('d-none');
        setShowingRestaurants('d-block');
        setJumboTitle(jumboTitleInit);
        setJumboText(jumboTextInit);
        setShowingChangeButton('d-none');
        setRestaurantID('');
    }

    return (
        <div className="App">
            <Header
                showingChangeButton={showingChangeButton}
                handleBackButton={handleBackButton}
            />
            <div className="m-3">
                <Jumbo
                    jumboTitle={jumboTitle}
                    jumboText={jumboText}
                    showingRestaurants={showingRestaurants}
                />
                <MainComponent
                    restaurantItems={restaurantItems}
                    setRestaurantID={setRestaurantID}
                    menuItems={menuItems}
                    setMenuItems={setMenuItems}
                    showingRestaurants={showingRestaurants}
                    showingMenuItems={showingMenuItems}
                    filteredMenuItems={filteredMenuItems}
                    setFilteredMenuItems={setFilteredMenuItems}
                />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
