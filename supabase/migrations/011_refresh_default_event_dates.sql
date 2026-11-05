with stale_defaults (id, title, old_month, old_day, next_month, next_day) as (
  values
    (1, 'Nairobi Reforestation Workshop', 'JAN', '28', 12, 15),
    (2, 'Youth Policy Summit', 'FEB', '12', 1, 12),
    (3, 'Eco-Literacy School Tour', 'MAR', '05', 2, 5),
    (4, 'Coastal Resilience Workshop', 'MAR', '20', 3, 20)
),
upcoming_defaults as (
  select stale_defaults.*,
    make_date(
      extract(year from current_date)::integer +
        case
          when make_date(extract(year from current_date)::integer, next_month, next_day) < current_date then 1
          else 0
        end,
      next_month,
      next_day
    ) as event_date
  from stale_defaults
)
update public.events as event
set
  date = to_char(upcoming_defaults.event_date, 'DD'),
  month = upper(to_char(upcoming_defaults.event_date, 'Mon')),
  year = to_char(upcoming_defaults.event_date, 'YYYY')
from upcoming_defaults
where event.id = upcoming_defaults.id
  and event.title = upcoming_defaults.title
  and event.month = upcoming_defaults.old_month
  and event.date = upcoming_defaults.old_day
  and event.year = '2026';
