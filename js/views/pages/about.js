import Component from '../../views/component.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1 class="page-title">Hi!<br>Your busy life deserves this! </h1>                   
                    <p class="about__info">Why do you need a to-do list app?</p>
                        <ul class="about_list">
                            <li>Helps you get organized</li>
                            <li>Helps you keep track of your life</li>
                            <li>Keeps you motivated Improves your memory</li>
                            <li>Makes you feel you have less work</li>
                        </ul>
                    <div><a class="about__btn-start button" href="#/tasks" title="Click here to get started!">Let's go!</a></div>
                </div>
            `);
        });
    }
}

export default About;