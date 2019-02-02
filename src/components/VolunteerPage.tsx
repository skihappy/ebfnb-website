/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import PageTitle from './PageTitle'
import drawing from '../assets/volunteer.png'

export const jsxFix = jsx

const VolunteerPage = () => (
  <Fragment>
    <PageTitle documentTitle="Volunteer with Us">
      Volunteer with East Bay Food Not Bombs
    </PageTitle>
    <img src={drawing} alt="Drawing of Food Not Bombs serving food." />
    <ul>
      <li>
        Visit local groceries, bakeries and markets to schedule the recovery of
        their surplus food.
      </li>
      <li>
        Recover unsold food from grocery stores, bakeries, produce markets, food
        producers and farms.
      </li>
      <li>
        Deliver surplus produce and bake goods to local shelters and food
        programs.
      </li>
      <li>
        Clean, cut and cook the recovered produce, grains and other ingredient
        to make vegan meals to share on the streets and at protests.
      </li>
      <li>
        Collect cooking and serving equipment or other supplies to help your
        local Food Not Bombs group.
      </li>
      <li>Help set up the food, literature and banner at the meals.</li>
      <li>Help share the prepared food at the meals.</li>
      <li>
        Wash the plates, silverware, pots, pans, cooking equipment and the
        kitchen where the meals were prepared.
      </li>
      <li>Make sure your meal location is clean and free of litter.</li>
      <li>Help load and unload your food deliveries.</li>
      <li>
        Write, illustrate, design and print flyers about the work your local
        Food Not Bombs is supporting.
      </li>
      <li>Staff the literature distro at the regular Food Not Bombs meals.</li>
      <li>Design and paint banners and signs to display at your meals.</li>
      <li>
        Post flyers at cafes, book stores, schools, laundry mats, libraries,
        groceries, bakeries, music shops and any place people will read and
        enjoy them.
      </li>
      <li>
        Organize a benefit concert or other event to bring awareness to your
        local Food Not Bombs group.
      </li>
      <li>
        Respond to emails, phone calls and other communications to your local
        Food Not Bombs group and share all communications with everyone in your
        chapter.
      </li>
      <li>
        Build bike carts to help collect and deliver the food, dishes.
        literature and banners.
      </li>
      <li>Book a venue for the regular meeting.</li>
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
        Participate in the meetings of other organizations, unions or other
        activist groups to find out how your chapter can offer support.
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
      <li>
        Write letters to our political prisoners. Visit
        {' '}
        <a href="http://www.greenisthenewred.com/blog/" target="_blank">
          www.greenisthenewred.com
        </a>
        {' '}
        to learn more and find their addresses.
      </li>
      <li>Help organize a protest, occupation or other action.</li>
      <li>Make sprouts and bring them to the meal.</li>
      <li>Make a solar oven to bake bread at the regular meals.</li>
      <li>
        Walk around the area before your meal and invite people to join you. You
        can hand out a quarter page flyer to each person with the day, time and
        location of your meal. This will help you share food with more people.
      </li>
      <li>
        Organize a presentation by Food Not Bombs cofounder Keith McHenry at
        your local college, bookstore, cafe or community center.
      </li>
    </ul>
    <form>
      <label id="email-label" htmlFor="email">
        My email address:
        <input
          id="email"
          name="email"
          type="email"
          css={css`
            margin: 0.5rem;
          `}
        />
      </label>
      <button type="submit">Yes, I&apos;ll help!</button>
    </form>
  </Fragment>
)

export default VolunteerPage
