import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Jumbo from "./Components/Jumbo";
import MainComponent from "./Components/MainComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";

function App() {

    const [restaurantItems, setRestaurantItems] = useState([]);
    const jumboTitleInit = 'Food. Delivered.';
    const jumboTextInit = 'Order your favourite food from local restaurants, right to your door.';
    const [jumboTitle, setJumboTitle] = useState(jumboTitleInit);
    const [jumboText, setJumboText] = useState(jumboTextInit);
    const [showingRestaurants, setShowingRestaurants] = useState(true);
    const [restaurantID, setRestaurantID] = useState('');
    const [menuItems, setMenuitems] = useState([]);

    useEffect(() => {

        if (restaurantID === '') {
            return;
        }

        console.log(restaurantID);
        fetchMenu()
            .then((menuData) => {
                setMenuitems(menuData);
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

    function handleButtonClick() {
        setJumboTitle('Wendys');
        setJumboText('');
        setShowingRestaurants(false);
    }

    return (
        <div className="App">
            <Header/>
            <div className="m-3">
                <Jumbo
                    jumbotitle={jumboTitle}
                    jumbotext={jumboText}
                    showingRestaurants={showingRestaurants}
                />
                <MainComponent
                    restaurantItems={restaurantItems}
                    setRestaurantID={setRestaurantID}
                    menuItems={menuItems}
                />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
