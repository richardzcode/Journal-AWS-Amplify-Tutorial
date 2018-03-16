const React = require('react');
const { Row, Col } = require('fluid-react');

const MarkdownBlock = require('../components/MarkdownBlock.js');

const no_languages_content = `
To have multi-language, write translations under \`website/i18n/$lang_code$\`

[Example](https://github.com/richardzcode/Dochameleon/tree/master/website/i18n)
`;

class Languages extends React.Component {
  render() {
    const { site, lang } = this.props;
    const { theme } = site;
    const langs = site.i18n.langs();
    const languages = langs && langs.length > 0
      ? langs.map((language, i) => {
          return (
            <Col xs={6} sm={4} md={3} lg={2} xl={1} key={i}>
              <a style={theme.a} href={site.url('', language)}>
                {site.i18n.translate(language, lang)}
              </a>
            </Col>
          );
        })
      : <MarkdownBlock site={site} lang={lang}>{no_languages_content}</MarkdownBlock>

    return (
      <div>
        <div style={theme.block}>
          <Row>
          {languages}
          </Row>
        </div>
      </div>
    );
  }
}

module.exports = Languages;
