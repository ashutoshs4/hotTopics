import moment from "moment";
import LogoutSvg from "../svgIcons/LogoutSvg";
import MobileWeekDaysWeather from "../weather/MobileWeekDaysWeather";


function NavbarTop() {
    return (
        <>
            <nav className="navbar navbar-expand navbar-expand-sm bg-light mt-4">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav nav-pills me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                News
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">
                                Portal
                            </a>
                        </li>
                    </ul>
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <LogoutSvg />
                </div>
            </nav>

            <div className="row mt-4">

                <div className="d-lg-none d-md-none">
                    <MobileWeekDaysWeather />
                </div>

                <div className="col-sm">
                    <h3 className="hot-topics">Hot Topics</h3>
                </div>
                <div className="col-sm d-none d-lg-block d-md-block">
                    <h3 className="float-md-end date-show">{moment().format('dddd DD MMMM YY') + "’"}</h3>
                </div>
            </div>

        </>
    )
}

export default NavbarTop;