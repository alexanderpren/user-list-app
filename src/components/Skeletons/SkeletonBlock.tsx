import './_skeleton.scss';

interface Props {
  width?: string;
  height?: string;
  circle?: boolean;
  className?: string;
}
const SkeletonBlock = ({ width, height, circle, className = '' }: Props) => {
  const inlineStyle = {
    width: width || '100%', //Ancho por defecto
    height: height || '20%',
    borderRadius: circle ? '50%' : '4px',
  };

  return <div className={`skeleton-placeholder ${className}`} style={inlineStyle}></div>;
};

export default SkeletonBlock;
