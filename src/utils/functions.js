// Material-ui styles
import { lighten, darken } from '@material-ui/core/styles';

// Main core
import { colorsPath } from '@utils/theme/palette';


///////////////////////////
// GET Color from Palette
///////////////////////////

export const getColor = (name, palette) => {
  const keys = colorsPath[name] || name;

  if (!keys) return null;
  
  return palette ?
    getNestedProperty(keys, palette):
    props => getNestedProperty(keys, props.theme.palette);
}

/////////////////////////
// GET NESTED Property
/////////////////////////

const reducer = (currentObj, currentKey) => 
  (currentObj && currentObj[currentKey]) ? currentObj[currentKey]: null;

export const getNestedProperty = (arrayKeys, obj) =>
  typeof arrayKeys === 'string'
  ? arrayKeys.split('.').reduce(reducer, obj)
  : arrayKeys.reduce(reducer, obj);


//////////////////////
// LIGHTED COLOR
//////////////////////

export const lightenColor = (color, coefficient) => props => {
  const hexColor = getColor(color, props.theme.palette) || color; 

  return lighten(hexColor, coefficient);
}

//////////////////////
// DARKEN COLOR
//////////////////////

export const darkenColor = (color, coefficient) => props => {
  const hexColor = getColor(color, props.theme.palette) || color; 
  
  return darken(hexColor, coefficient);
}


//////////////////////
// FILTER PROPS
//////////////////////
export const filterProps = (Component, removeList) => (props => {
  let newProps = Object.assign({}, props);
  removeList.map(propName => !!newProps[propName] && delete newProps[propName]);

  return <Component {...newProps} />;
});
