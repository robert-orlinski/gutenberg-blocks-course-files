import './index.scss';

import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, Icon, PanelBody, ColorPalette, RangeControl } from '@wordpress/components';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { useSelect } from '@wordpress/data';

const HighlightButton = (props) => {
  const selectedBlock = useSelect((select) => {
    return select('core/block-editor').getSelectedBlock();
  }, []);

  if (selectedBlock && selectedBlock.name !== 'rob/table-of-contents') {
    return null;
  }

  return (
    <BlockControls>
      <Toolbar>
        <ToolbarButton
          label="Zaznaczenie"
          className="highlight-button"
          onClick={() => {
            props.onChange(
              toggleFormat(props.value, { type: 'custom-formats/highlight' })
            );
          }}
          isActive={props.isActive}
        >
          <Icon icon="admin-customizer" />
        </ToolbarButton>
      </Toolbar>
    </BlockControls>
  );
};

registerFormatType('custom-formats/highlight', {
  title: 'Zaznaczenie',
  tagName: 'span',
  className: 'highlight',
  edit: HighlightButton,
});

registerBlockType('rob/table-of-contents', {
  title: 'Spis treści',
  description: 'Sekcja z nagłówkiem oraz spisem treści konkretnego artykułu',
  icon: 'editor-table',
  keywords: ['zawartość', 'lista', 'table of contents'],
  category: 'content',

  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: 'h2',
    },
    list: {
      type: 'array',
      source: 'children',
      selector: 'ol',
    },
    backgroundColor: {
      type: 'string',
    },
    padding: {
      type: 'number',
    },
  },

  edit({ attributes, setAttributes }) {
    const { title, list, backgroundColor, padding } = attributes;

    function setTitle(newTitle) {
      setAttributes({ title: newTitle });
    }

    function setListContent(newList) {
      setAttributes({ list: newList });
    }

    function setBackgroundColor(newColor) {
      setAttributes({ backgroundColor: newColor });
    }

    function setPadding(newPadding) {
      setAttributes({ padding: newPadding });
    }

    return (
      <>
        <InspectorControls>
          <PanelBody title="Kolor tła">
            <ColorPalette
              colors={[
                { name: 'Niebieski', color: '#E3F2FD' },
                { name: 'Niebieski - przydymiony', color: '#ECEFF1' },
                { name: 'Czerwony', color: '#FFEBEE' },
              ]}
              value={backgroundColor}
              onChange={setBackgroundColor}
            />
          </PanelBody>
          <PanelBody title="Odstęp wewnętrzny">
            <RangeControl
              value={padding}
              onChange={setPadding}
              initialPosition={0}
            />
          </PanelBody>
        </InspectorControls>
        <div class="table-of-contents-block" style={{ 
          backgroundColor,
          padding
        }}>
          <RichText
            tagName="h2"
            placeholder="Tytuł spisu treści"
            value={title}
            onChange={setTitle}
            allowedFormats={[
              'core/bold',
              'core/italic',
              'core/link',
              'core/text-color',
              'core/strikethrough',
              'custom-formats/highlight',
            ]}
          />
          <RichText
            tagName="ol"
            placeholder="Spis treści"
            value={list}
            multiline="li"
            onChange={setListContent}
            allowedFormats={[
              'core/bold',
              'core/italic',
              'core/link',
              'core/text-color',
              'core/strikethrough',
              'custom-formats/highlight',
            ]}
          />
        </div>
      </>
    );
  },

  save({ attributes }) {
    const { title, list, backgroundColor, padding } = attributes;

    return (
      <div class="table-of-contents-block" style={{ 
        backgroundColor,
        padding,
      }}>
        <h2>{title}</h2>
        <RichText.Content tagName="ol" value={list} />
      </div>
    );
  },
});
