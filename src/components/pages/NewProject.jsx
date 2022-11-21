import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

export default function NewProject(){

  return (
    <div className={styles.newProjectContainer}>
      <h1>New Project</h1>
      <p>Create a new project then add services</p>
      <ProjectForm btnText={'Create Project'}/>
    </div>
    
  )
}