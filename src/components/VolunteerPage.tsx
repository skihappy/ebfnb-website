/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import { Router, Link, Match } from '@reach/router'
import PageTitle from './PageTitle'
import LazyRoute from './LazyRoute'

export const jsxFix = jsx

type Page = (RouteComponentProps) => JSX.Element

const Breadcrumb = ({ path = [] }: { path?: {key: string, label: string}[]}) => (
  <nav>
    <ul css={css`
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: inline-block;
        & + li {
          &::before {
            content: '»';
            padding: 0 .5rem;
          }
        }
      }
    `}
    >
      <li>{path.length < 1 ? "Volunteer with East Bay Food Not Bombs" : <Link to="../">Volunteer with East Bay Food Not Bombs</Link>}</li>
      {path.map(item => (
        <li key={item.key}>{item.label}</li>
      ))}
    </ul>
  </nav>
)

const Widget = props => (
  <form {...props}>
    <label id="email-label" htmlFor="email">
      My email address:
      <input
        id="email"
        name="email"
        type="email"
        css={css`
          margin: 0.5rem 0;
        `}
      />
    </label>
    <button type="submit">Yes, I&apos;ll help!</button>
  </form>
)

const WaysToHelpPage: Page = () => (
  <article>
    <PageTitle>Ways to help</PageTitle>
    <ul>
      <li>
        Pick up unsold food from grocery stores, bakeries, produce markets, food
        producers and farms.
      </li>
      <li>
        Deliver surplus produce and bake goods to local shelters and food
        programs.
      </li>
      <li>
        Clean, cut and cook the recovered produce, grains and other ingredient
        to make vegetarian meals to share.
      </li>
      <li>Collect cooking and serving equipment or other supplies.</li>
      <li>Help serve the prepared food at the meals.</li>
      <li>
        Wash the plates, silverware, pots, pans, cooking equipment and the
        kitchen where the meals were prepared.
      </li>
      <li>Help load and unload your food deliveries.</li>
      <li>
        Write, illustrate, design and print flyers about the work Food Not Bombs
        is supporting.
      </li>
      <li>Design and paint banners and signs.</li>
      <li>
        Post flyers at cafes, book stores, schools, laundry mats, libraries,
        groceries, bakeries, music shops and any place people will read and
        enjoy them.
      </li>
      <li>
        Organize a benefit concert or other event to bring awareness to Food Not
        Bombs.
      </li>
      <li>Respond to emails, phone calls and other communications.</li>
      <li>
        Build bike carts to help collect and deliver the food, dishes.
        literature and banners.
      </li>
      <li>Help develop the agenda for the next meeting.</li>
      <li>
        Post a Facebook for your chapter or design a website to list the day,
        time and location of your meals and contact information.
      </li>
      <li>
        Organize music, puppet shows or other cultural events at your regular
        meals.
      </li>
      <li>
        Help organize a Really Really Free Market, Food Not Lawns community
        garden, seed bank, Bikes Not Bombs repair day, Homes Not Jails housing
        take over or other project and produce a flyer to promote the project at
        your regular meal.
      </li>
      <li>
        Organize a movie night, concert, play, puppet show or other events to
        introduce more people to the work of your Food Not Bombs group.
      </li>
      <li>Make sprouts and bring them to the meal.</li>
      <li>Make a solar oven to bake bread at the regular meals.</li>
      <li>
        Walk around the area before your meal and invite people to join you. You
        can hand out a quarter page flyer to each person with the day, time and
        location of your meal. This will help you share food with more people.
      </li>
    </ul>
  </article>
)

const KitchensPage: Page = () => (
  <article>
    <Breadcrumb path={[{ key: 'kitchens', label: 'Kitchens' }]} />
    <PageTitle>Our Kitchens</PageTitle>
    <ul>
      <li>
        <strong>Monday</strong>
        <br />
        Newman Hall 2700 Dwight Way, Berkeley.
        <br />
        Show up at 10:30 am.
      </li>
      <li>
        <strong>Tuesday</strong>
        <br />
        First Presbyterian Church, 27th St and Broadway, Oakland (enter from
        27th St).
        <br />
        Cooking starts at 11am.
      </li>
      <li>
        <strong>Wednesday</strong>
        <br />
        St. John&apos;s Presbyterian Church, 2727 College Ave, Berkeley.
        <br />
        Help out at 11:30 am.
      </li>
      <li>
        <strong>Thursday</strong>
        <br />
        <em>Berkeley serving: </em>
        St. John&apos;s Presbyterian Church, 2727 College Ave, Berkeley.
        <br />
        Be there at 11:30am.
        <br />
        <em>Oakland serving: </em>
        First Presbyterian Church 27th and Broadway, Oakland.
        <br />
        We get started at 10:30am. You can call Joe for more info: (510)
        542-3112.
      </li>
      <li>
        <strong>Friday</strong>
        <br />
        Lothlorian Student Cooperative, 2415 Prospect St (corner of Hillside
        Ave), Berkeley.
        <br />
        Come at 11:30am.
      </li>
      <li>
        <strong>Sunday</strong>
        <br />
        <em>Currently looking for a new cookhouse.</em>
      </li>
    </ul>
  </article>
)

const DefaultPage: Page = () => (
  <article>
    <PageTitle documentTitle="Volunteer with Us">
      Volunteer with East Bay Food Not Bombs
    </PageTitle>
    <div>
      <img
        src="/images/volunteer-with-us.png"
        alt="Drawing of Food Not Bombs serving food."
        css={css`
          float: right;
          max-width: 400px;
          margin-left: 2rem;
          width: 100%;
        `}
      />
      <p>
        We always can use an extra hand. The kitchen is a good place to start as
        a new volunteer, but
        {' '}
        <Link to="ways-to-help">
          there are a number of other ways to help out
        </Link>
        {'. '}
        For example, we need help managing our food flow in our pantry and cold
        storage, we need licensed drivers to help with regular donation pick-ups
        from farmers’ markets and super markets, we need help building and
        maintaining our website, we need people to welcome new volunteers.
      </p>
      <p>
        Of course you are also welcome to
        {' '}
        <Link to="come-to-our-kitchens">show up to any of our kitchens</Link>
        {' '}
        to help prepare the days meal.
      </p>
    </div>
  </article>
)

const VolunteerPage = () => (
  <Fragment>
    <Router>
      <DefaultPage path="/" />
      <WaysToHelpPage path="ways-to-help" />
      <KitchensPage path="come-to-our-kitchens" />
    </Router>
    <Widget
      id="volunteer-widget"
      css={css`
        max-width: 100%;
        width: 20rem;
        margin-left: auto;
        margin-right: auto;
        border: 2px solid #000;
        padding: 2rem;
      `}
    />
    <ul>
      <Match path="./">
        {({ match }) =>
          match ? null : (
            <li>
              <Link to="./">Volunteer with us</Link>
            </li>
          )
        }
      </Match>
      <Match path="ways-to-help">
        {({ match }) =>
          match ? null : (
            <li>
              <Link to="ways-to-help">Ways to help</Link>
            </li>
          )
        }
      </Match>
      <Match path="come-to-our-kitchens">
        {({ match }) =>
          match ? null : (
            <li>
              <Link to="come-to-our-kitchens">Come to our kitchens</Link>
            </li>
          )
        }
      </Match>
    </ul>
  </Fragment>
)

export default VolunteerPage
