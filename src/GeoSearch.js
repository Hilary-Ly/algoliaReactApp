import { connectGeoSearch } from 'react-instantsearch-dom';

class GeoSearch extends Component {
  isUserInteraction = true;
  markers = [];

  componentDidMount() {
    const { refine } = this.props;

    this.instance = L.map(this.el);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.instance);

    this.instance.on('moveend', () => {
      if (this.isUserInteraction) {
        const ne = this.instance.getBounds().getNorthEast();
        const sw = this.instance.getBounds().getSouthWest();

        refine({
          northEast: { lat: ne.lat, lng: ne.lng },
          southWest: { lat: sw.lat, lng: sw.lng },
        });
      }
    });
  }

  componentDidUpdate() {
    const { hits, currentRefinement, position } = this.props;

    this.markers.forEach(marker => marker.remove());

    this.markers = hits.map(({ _geoloc }) =>
      L.marker([_geoloc.lat, _geoloc.lng]).addTo(this.instance)
    );

    this.isUserInteraction = false;
    if (!currentRefinement && this.markers.length) {
      this.instance.fitBounds(L.featureGroup(this.markers).getBounds(), {
        animate: false,
      });
    } else if (!currentRefinement) {
      this.instance.setView(
        position || {
          lat: 48.864716,
          lng: 2.349014,
        },
        12,
        {
          animate: false,
        }
      );
    }
    this.isUserInteraction = true;
  }

  render() {
    const { currentRefinement, refine } = this.props;

    return (
      <div>
        <div style={{ height: 500 }} ref={c => (this.el = c)} />
        {Boolean(currentRefinement) && (
          <button onClick={() => refine()}>Clear map refinement</button>
        )}
      </div>
    );
  }
}

const CustomGeoSearch = connectGeoSearch(GeoSearch);