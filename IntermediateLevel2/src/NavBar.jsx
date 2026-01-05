
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <>
            <nav >
                <div className='navBarStyle'>
                    <Link to="/userList" className='LinkTag'>userList-Level:2.1</Link>
                    <Link to="/SearchFilter" className='LinkTag'>SearchFilter-Level:2.2</Link>
                    <Link to="/FormValidation" className='LinkTag'>FormValidation-Level:2.3</Link>
                    <Link to="/ShoppingCart" className='LinkTag'>ShoppingCart-Level:2.4</Link>
                    <Link to="/StopWatch" className='LinkTag'>StopWatch-Level:2.5</Link>
                    <Link to="/Model" className='LinkTag'>Model-Level:2.6</Link>
                    <Link to="/Weather" className='LinkTag'>Weather app</Link>

                </div>

            </nav>
        </>
    )

}
export default NavBar;