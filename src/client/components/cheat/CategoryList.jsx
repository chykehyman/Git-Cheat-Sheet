import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import Masonry from 'react-masonry-component';

const CategoryList = ({
  allGitCheats,
  toggleDisplay,
  isDisplayed,
  cheatId
}) => (
  <Masonry className="card-columns">
    {allGitCheats.map(category => (
      <div className="col-md-4" key={category.name}>
        <div className="card">
          <div className="card-header">{category.name}</div>
          {category.cheats.map(cheat => (
            <div key={cheat._id} className="pt-0 pr-2 pl-2 pb-2">
              <small className="card-title">{cheat.description}</small>
              <small
                style={{
                  display: `${
                    isDisplayed && cheatId === cheat._id ? 'inline' : 'none'
                  }`,
                  float: 'right',
                  fontStyle: 'italic',
                  fontSize: '10px'
                }}
              >
                Copied!
              </small>
              <small>
                <CopyToClipboard
                  text={cheat.command}
                  onCopy={() => toggleDisplay(cheat._id)}
                >
                  <code className="card-text d-block">
                    <span className="mr-2">$</span>
                    {cheat.command}
                  </code>
                </CopyToClipboard>
              </small>
            </div>
          ))}
        </div>
      </div>
    ))}
  </Masonry>
);
CategoryList.propTypes = {
  allGitCheats: PropTypes.array.isRequired,
  toggleDisplay: PropTypes.func.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  cheatId: PropTypes.string.isRequired
};

export default CategoryList;
