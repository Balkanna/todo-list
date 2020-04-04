import Component from '../../views/component.js';

class Footer extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <footer class="footer">                   
                    <p class="footer__info">
                        &copy; All Rights Reserved, 2020
                    </p>                  
                </footer>
            `);
        });
    }
}

export default Footer;