import styles from './question_form.module.css';
import { useRouter } from 'next/router';

export default function LoginForm(props) {
    return (
        <div className={styles.root}>
            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>Location of Project</h1>
                    <label className={styles.label} for="conZip"><img className={styles.mapIcon} src="mapIcon.png" /></label>
                    <input className={styles.input} required name="username" id="username" placeholder="Zip Code" type="text" />
                </form>
            </div>

            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>How many areas need to be painted</h1>
                    <label className={styles.label} for="conZip"><img className={styles.paintIcon} src="paintIcon.jpg" /></label>
                    <select className={styles.select} name="cars" id="cars">
                        <option value="1-2">1-2</option>
                        <option value="3-4">3-4</option>
                        <option value="5-6">5-6</option>
                        <option value="7-8">7-8</option>
                        <option value="9+">9+</option>
                    </select>
                </form>
            </div>


            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>How many areas need to be updated</h1>
                    <label className={styles.label} for="conZip"><img className={styles.paintIcon} src="squareIcon.png" /></label>
                    <select className={styles.select} name="cars" id="cars">
                        <option value="1-2">Under 1500 sqft</option>
                        <option value="3-4">1500 - 2500 sqft</option>
                        <option value="5-6">2500 - 3500 sqft</option>
                        <option value="7-8">Over 3500 sqft</option>
                        <option value="9+">I'm not sure</option>
                    </select>
                </form>
            </div>


            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>Which rooms need to be painted</h1>
                    <label className={styles.label} for="conZip"><img className={styles.paintIcon} src="homeIcon.png" /></label>
                    <select className={styles.select} name="cars" id="cars">
                        <option value="1-2">Kitchen</option>
                        <option value="3-4">Bathroom(s)</option>
                        <option value="5-6">Bedroom(s)</option>
                        <option value="7-8">Living Areas</option>
                        <option value="9+">Dining Room</option>
                        <option value="9+">Hallways</option>
                        <option value="9+">Stairways</option>
                        <option value="9+">Other</option>
                    </select>
                </form>
            </div >


            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>What needs to be painted</h1>
                    <label className={styles.label} for="conZip"><img className={styles.paintIcon} src="areaPaintIcon.png" /></label>
                    <select className={styles.select} name="cars" id="cars">
                        <option value="1-2">Ceiling</option>
                        <option value="3-4">Wall</option>
                        <option value="5-6">Trim</option>
                        <option value="7-8">Other</option>
                        <option value="9+">I don't know</option>
                    </select>
                </form>
            </div >


            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>When would you like project to be completed</h1>
                    <label className={styles.label} for="conZip"><img className={styles.paintIcon} src="timeIcon.png" /></label>
                    <select className={styles.select} name="cars" id="cars">
                        <option value="1-2">Flexible</option>
                        <option value="3-4">Within a week</option>
                        <option value="5-6">1-2 weeks</option>
                        <option value="7-8">2-3 weeks</option>
                        <option value="9+">3+ weeks</option>
                    </select>
                </form>
            </div >


            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>Would you like to finance</h1>
                    <label className={styles.label} for="conZip"><img className={styles.paintIcon} src="moneyIcon.png" /></label>
                    <select className={styles.select} name="cars" id="cars">
                        <option value="1-2">Yes</option>
                        <option value="3-4">No</option>
                    </select>
                </form>
            </div >


            <div className={styles.formWrapper}>
                <form className={styles.form} method="post" action="/api/login" id="login">
                    <h1 className={styles.title}>Please tell us about your project.</h1>
                    <label className={styles.label} for="conZip"><img className={styles.mapIcon} src="descriptionIcon.png" /></label>
                    <input className={styles.input} required name="username" id="username" placeholder="Enter a Description" type="textarea" />
                </form>
            </div >
        </div >

    )
}
