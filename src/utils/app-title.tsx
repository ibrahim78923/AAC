export const formatPathname = (pathname: any) => {
  if (!pathname || pathname === '/') {
    return '';
  }
  const parts = pathname.replace(/^\/|\/$/g, '').split('/');
  const formattedPathname = parts
    .map((part: any) => {
      const subParts = part.split('-');
      const capitalizedSubParts = subParts.map(
        (subPart: any) => subPart.charAt(0).toUpperCase() + subPart.slice(1),
      );
      return capitalizedSubParts.join(' ');
    })
    .join(' - ');
  return formattedPathname;
};
