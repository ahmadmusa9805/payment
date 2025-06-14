// import "./App.css";
// import Participate from './Participate.jsx'; // Default import
// import ChatActorToActor from "./components/ChatActorToActor";
// import ChatAdminToActor from "./components/ChatAdminToActor";

// function App() {
//   const userRole = 'admin'
//   const UserRole = 'actor1'
//   return (
//     <>
//           <div className="App">
//            <ChatAdminToActor  userRole={userRole}/>
//            <ChatActorToActor UserRole={UserRole}/>
           
//           <h1>I am payment component</h1>
//           <Participate />
//          </div>
   
//     </>
//   );
// }

// export default App;
//////////////
import "./App.css";
import ChatApp from "./ChatApp";
import PaymentForm from "./components/PaymentForm";
import PaymentPage from "./Payment";

function App() {

  return (
    <>
      {/* <PaymentForm></PaymentForm> */}
      {/* <PaymentPage></PaymentPage> */}
      <ChatApp userId="684bc809608418f7950c3573"></ChatApp>
    </>
  );
}

export default App;