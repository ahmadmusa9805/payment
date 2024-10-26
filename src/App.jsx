import "./App.css";
// import PaymentForm from "./Participate.jsx";
import Participate from './Participate.jsx'; // Default import
// import PaymentForm from "./paymentForm";
// import ChatActorToActor from "./components/ChatActorToActor";
// import ChatAdminToActor from "./components/ChatAdminToActor";

function App() {
  // const [count, setCount] = useState(0);
  // const userRole = 'admin'
  // const UserRole = 'actor1'
  return (
    <>
     
      <div>
        {/* <h1>Community Explore</h1> */}
        {/* <div className="App">
           <ChatAdminToActor  userRole={userRole}/>
           <div ><hr /></div>
           <ChatActorToActor UserRole={UserRole}/>

         </div> */}
      </div>
      <div>
        <h1>I am payment component</h1>
         {/* <h1>Stripe Payment Integration</h1> */}
          <Participate entryFee={500} competitionId={1111} />
          {/* <Participate entryFee={500} competitionId={"6719ec708a97224f8227b942"} /> */}
          {/* <Participate entryFee={500} competitionId={"6719ec708a97224f8227b942"} /> */}
          {/* <PaymentForm /> */}
      </div>
    </>
  );
}

export default App;
