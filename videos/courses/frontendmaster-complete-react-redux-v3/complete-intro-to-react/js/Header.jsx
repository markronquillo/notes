// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props: { 
  showSearch?: boolean, 
  handleSearchTermChange?: Function, 
  searchTerm?: string 
}) => { 
  let utilSpace;
  if (props.showSearch) {
	  utilSpace = <input 
	  			value={props.searchTerm} 
	  			onChange={props.handleSearchTermChange} 
	  			type="text" placeholder="Search" />
  } else {
    utilSpace = <h2>
        <Link to="/search">
          Back
        </Link>
      </h2>
  }

  return <header>
    <h1>
      <Link to="/">
          svideo
      </Link>
     </h1>
  </header>

}

Header.defaultProps = {
  showSearch: false,
  searchTerm: '',
  handleSearchTermChange: function noop() {}
}

export default Header;
 