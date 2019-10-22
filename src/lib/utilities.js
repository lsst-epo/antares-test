import axios from 'axios';

export const exampleFunc = function(something) {
  return something || null;
};

export const AntaresClient = function async() {
  const Api = {};

  Api.getLocusId = async function(ra, dec, radius) {
    const locusIds = await axios.get(
      `https://antares.noao.edu/api/alerts/cone_search/?ra=${ra}&dec=${dec}&radius=${radius}`
    );
    return locusIds.data.result[0].locus_id;
  };

  Api.getLightCurve = async function(locusId) {
    const lightCurve = await axios.get(
      `https://antares.noao.edu/alerts/lightcurve-data/?locus_id=${locusId}`
    );

    return lightCurve.data.result;
  };

  Api.getLightCurves = async function(ra, dec, radius) {
    const locusId = await this.getLocusId(ra, dec, radius);

    if (locusId === undefined || locusId.length === 0) {
      return {};
    }

    const lightCurves = await this.getLightCurve(locusId);
    return lightCurves;
  };

  return Api;
};
