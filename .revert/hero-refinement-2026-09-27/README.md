# Hero refinement restore point

The original versions of the four edited files are preserved here. To revert only this hero refinement while keeping other file changes, run from the project root:

```sh
patch -R -p1 < .revert/hero-refinement-2026-09-27/change.patch
```

If those same lines change later, ask Codex to revert the hero refinement selectively rather than replacing whole files.
