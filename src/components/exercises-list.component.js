 import React,{Component}from 'react';
 import axios from 'axios';
 import {Link} from 'react-router-dom'; 

 const Exercise = props =>(
     <tr>
         <td>{props.exercise.username}</td>
         <td>{props.exercise.description}</td>
         <td>{props.exercise.duration}</td>
         <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <link to={"/edit/"+props.execise._id}>edit</link>| <a herf="#"onClick={()=>{props.deleteExercise(props.exercise._id)}}>delet</a>
            </td>         
     </tr>
 )

 export default class ExercisesList extends Component{
     constructor(props){
         super(props);
         this.deleteExercise =this.deleteExercise.bind(this)
         this.state = {execises :[]}
     }
     componentDidMount(){
         axios.get('http://localhost:5000/exercises/')
         .then(response=>{
             this.setState({execises:response.data})
         })
         .catch((error)=>{
             console.log(error);
         })
     }
     deleteExercise(id){
         axios.delete('http://localhost:5000/exercises/'+id)
         .then(res=>console.log(res.data));
         this.setState({
             execises:this.state.execises.filter(el=>el._id !==id)
         })
     }
     exerciseList(){
         return this.state.exercises.map(currentexercise=>{
             return<Exercise exercise ={currentexercise}deleteExercise={this.daleteExercise} key={currentexercise._id}/>
         })
     }
     render(){
         return(
             <div>
                 <h3>Logged Exercises</h3>
                 <table className="table">
                     <thread className="thead-light">
                         <tr>
                             <th>Username</th>
                             <th>Description</th>
                             <th>Duration</th>
                             <th>Date</th>
                             <th>Action</th>

                         </tr>
                     </thread>
                     <body>
                         {this.exerciseList()}
                     </body>
                 </table>
             </div>
         )
     }
 }