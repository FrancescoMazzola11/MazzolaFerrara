import { Image}  from "react-bootstrap"
import React from "react"


const Footer = () => <footer style={{marginTop:"0"}} className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left bg-light text-dark text-light">
        <div className="row mt-3 pt-3">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">What's DREAMS?</h5>
                <p>DREAMS in a web application developed thanks to the efforts of Talengana government in order to improve
                    the production of the state's farmers. Drams was developed by the students Francesco Mazzola and Alessio Ferrara
                </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md mb-md-0 mb-3">
                <h5 className="text-uppercase">Useful Links</h5>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </div>
        </div>
    </div>

    <div className="footer-copyright bg-light text-dark text-center py-3">© 2022 Copyright @
        <a href="/" className="text-success"> Francesco Mazzola & Alessio Ferrara</a>
        <i class="fa fa-android" aria-hidden="true"></i>
    </div>

</footer>

export default Footer;