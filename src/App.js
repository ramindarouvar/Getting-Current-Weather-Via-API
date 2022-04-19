import { Fragment } from 'react';
import Weather from './components/weather/Weather';

function App() {
  return (
    <Fragment>
      <div className="row justify-content-around py-5">
        <div className="col-10">
          <Weather />
        </div>
      </div>
      <footer className="fixed-bottom">
            <div className="footer-navs">
                <div className="container-md text-center">
                    <div className="footer-copyright py-3">
                    © کلیه حقوق این سامانه متعلق به رامین داروور  می‌باشد.
                    </div>
                </div>
            </div>
        </footer>
    </Fragment>
  );
}

export default App;
