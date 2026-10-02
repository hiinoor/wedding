import { Reveal } from "@/components/Reveal";
import { wedding, type TransportPoint } from "@/data/wedding";
import { mapsDirectionsUrl, mapsSearchUrl } from "@/lib/maps";

function MapAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="travel__action" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <svg className="travel__action-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
        <path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function Route({
  kind,
  point,
  secondary = false,
}: {
  kind: string;
  point: TransportPoint;
  secondary?: boolean;
}) {
  const venue = wedding.travel.venue;
  const origin = point.city ? `${point.name}, ${point.city}` : point.name;
  const time = point.travelTime.startsWith("Approx.")
    ? point.travelTime
    : `Approx. ${point.travelTime}`;

  return (
    <div className={`travel__route${secondary ? " travel__route--secondary" : ""}`}>
      <div className="travel__route-label">
        <p className="eyebrow">{kind}</p>
      </div>
      <div className="travel__route-main">
        <h3>{point.name}{point.city ? <span>, {point.city}</span> : null}</h3>
        <div className="travel__route-metrics">
          <p><strong>{point.distance}</strong><span>road distance</span></p>
          <p><strong>{time} by car</strong><span>estimated travel</span></p>
        </div>
      </div>
      <MapAction href={mapsDirectionsUrl(venue.mapsQuery, origin)}>Get directions</MapAction>
    </div>
  );
}

export function Travel() {
  const { travel, stay } = wedding;
  const { venue, airport, railwayPrimary, railwaySecondary } = travel;

  return (
    <section id="travel" className="travel" aria-labelledby="travel-title">
      <div className="travel__venue section-space">
        <div className="site-container">
          <Reveal delay={0.05}>
            <div className="travel__location">
              <div className="travel__location-mark" aria-hidden="true" />
              <div className="travel__location-content">
                <p className="eyebrow">{travel.eyebrow}</p>
                <h2 id="travel-title">{venue.name}</h2>
                <p className="travel__location-area">{venue.area.replace(", ", " · ")}</p>
                <address>{venue.address}</address>
                <div className="travel__location-actions">
                  <MapAction href={mapsSearchUrl(venue.mapsQuery)}>View on Google Maps</MapAction>
                  <MapAction href={mapsDirectionsUrl(venue.mapsQuery)}>Get directions</MapAction>
                </div>
              </div>
              <div id="your-stay" className="travel__location-stay" aria-labelledby="stay-title">
                <div className="travel__stay-heading">
                  <p id="stay-title" className="eyebrow">Your stay</p>
                  <p>{wedding.month} {wedding.year}</p>
                </div>
                <div className="travel__stay-details">
                  <div className="travel__stay-grid">
                    <div className="travel__stay-date">
                      <span className="travel__stay-number">{stay.checkIn.day}</span>
                      <div><strong>{stay.checkIn.time}</strong><span>Check-in</span></div>
                    </div>
                    <div className="travel__stay-date">
                      <span className="travel__stay-number">{stay.checkOut.day}</span>
                      <div><strong>{stay.checkOut.time}</strong><span>Check-out</span></div>
                    </div>
                  </div>
                  <p className="travel__stay-note">{travel.arrivalNote}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="travel__guide section-space">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow travel__guide-heading">Getting there</p>
          </Reveal>

          <div className="travel__routes">
            <Reveal delay={0.04}><Route kind="By air" point={airport} /></Reveal>
            <Reveal delay={0.1}><Route kind="By train · main station" point={railwayPrimary} /></Reveal>
            <Reveal delay={0.16}><Route kind="By train · alternative" point={railwaySecondary} secondary /></Reveal>
          </div>

          <Reveal>
            <div className="travel__journey-note">
              <p className="eyebrow">A quick note for your journey</p>
              <p>{travel.journeyNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
