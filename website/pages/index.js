const React = require('react');
const path = require('path');

const dfs = require('../dfs.js');

const Doc = require('../components/docs/Doc.js');

const join = path.join;

class ReadMe extends React.Component {
  render() {
    const { site, lang } = this.props;

    let readme_path = join(__dirname, './README.md');
    const doc = site.docs.processMetadata(readme_path);
    return (
      <div>
        <Doc site={site} lang={lang}>
          {doc.content}
        </Doc>
      </div>
    );
  }
}

module.exports = ReadMe;
