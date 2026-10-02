import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { wedding } from "@/data/wedding";

export function Schedule() {
  return (
    <section id="schedule" className="schedule section-space" aria-labelledby="schedule-title">
      <div className="site-container">
        <div className="schedule__opening">
          <Reveal>
            <header className="schedule__heading">
              <h2 id="schedule-title">{wedding.scheduleTitle}</h2>
            </header>
          </Reveal>
          <Reveal className="schedule__opening-visual" variant="image" direction="right" delay={0.08}>
            <figure className="schedule__opening-photo">
              <Image src={wedding.photography.scheduleMood.src} alt={wedding.photography.scheduleMood.alt} fill sizes="(max-width: 767px) calc(100vw - 2.5rem), 42vw" style={{ objectPosition: wedding.photography.scheduleMood.objectPosition }} />
            </figure>
          </Reveal>
        </div>

        <div className="schedule__days">
          {wedding.days.map(({ day, label }, dayIndex) => {
            const events = wedding.events.filter((event) => event.day === day);

            return (
              <section className="schedule__day" aria-labelledby={`schedule-day-${day}`} key={day}>
                <Reveal className="schedule__day-heading">
                  <p className="eyebrow">Day {dayIndex + 1}</p>
                  <h3 id={`schedule-day-${day}`}>
                    <span>{day}</span>
                    <small>{label}</small>
                  </h3>
                </Reveal>

                <ScheduleTimeline>
                  {events.map((event, index) => {
                    const dressCode = wedding.dressCodes.find((code) => code.id === event.dressCodeId);

                    return (
                      <li className="schedule__event" key={event.id}>
                        <Reveal delay={index * 0.065}>
                          <div className="schedule__event-grid">
                            <p className="schedule__time">{event.time}</p>
                            <span className="schedule__marker" aria-hidden="true" />
                            <div className="schedule__event-content">
                              <h4>{event.title}</h4>
                              <p className="schedule__description">{event.description}</p>
                              {dressCode ? <p className="schedule__mood">Style mood · {dressCode.mood}</p> : null}
                            </div>
                          </div>
                        </Reveal>
                      </li>
                    );
                  })}
                </ScheduleTimeline>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
