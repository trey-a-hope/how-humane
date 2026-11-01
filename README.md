# How Human?

A small web experiment from 2016 about snap judgments. The page shows a random person (photo and profile from the [Random User Generator](https://randomuser.me) API) and asks you a positive or negative question about them, such as "Would you lend this person $5 if they really needed it?" It times each answer, and after three questions (`totalQuestions` in `ts/Services.ts`) a Results page lists every question, your answer, how long you took and the person you were looking at.

## How it works

- `ts/Services.ts` holds the AngularJS services: `$apiService` fetches a random person from `https://randomuser.me/api/` and the question lists, `$timerService` times each answer, and `$uiStoreService` keeps the count and responses for the Results page.
- `ts/Controllers.ts` runs the flow: load a person with a random color and Animate.css entrance, open the positive or negative question modal (`modal-templates/`), record the answer and time, then load the next person. When all questions are answered, the test-complete modal points you to Results.
- `views/` has the main, results and about pages, routed with Angular UI Router (`ts/Routing.ts`).
- The question sets are in `json/positive-questions.json` and `json/negative-questions.json`. The service loads them from the old `hopet1/Random-Person` GitHub repo's raw URLs, not from these local files, so edits here won't show up until those URLs are changed.

## Tech stack

- AngularJS 1.x with Angular UI Router and UI Bootstrap modals, written in TypeScript (compiled `.js` and `.d.ts` files are committed in `js/`)
- Bootstrap 3 with a sidebar layout, Font Awesome 4.4, Animate.css
- NetBeans project files in `nbproject/`

## Running it

It's a static site, so any local web server works:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

To change the TypeScript, edit `ts/` and recompile with `tsc` (see `tsconfig.json`).

## License

Apache License 2.0 (see `LICENSE`).
