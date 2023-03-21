import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

var isAdmin = false;
/*‮ } ⁦if (isAdmin)⁩ ⁦ begin admins only */
    console.log("You are an admin.");
/* end admins only ‮ { ⁦*/

export default reportWebVitals;
