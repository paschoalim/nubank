import React from 'react'
import { Router, Scene} from 'react-native-router-flux'
import Index from './Index.js'
import Home from './Home.js'
import About from './About.js'


const Routes = () => (

    <>
  
   
   <Router>
      <Scene key = "root">
      <Scene key = "index" component = {Index} title = "Index" hideNavBar  initial = {true} />
         <Scene key = "home" component = {Home} title = "Home" navigationBarStyle={{ backgroundColor: '#8B10AE'}}  />
         <Scene key = "about" component = {About} title = "About" />
      </Scene>
   </Router>
   
   </>

)
export default Routes