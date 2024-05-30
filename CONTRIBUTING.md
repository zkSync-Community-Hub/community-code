# How to Contribute Guides to Community Code

We are always glad for new contributions from community members to spread the zkSync knowledge!
If you are interested in adding a new guide to the Community Code, this is the section for you.
If you are looking to contribute project changes like fixing bugs, please checkout the [Readme](README.md).

## 📜 Writing a new guide

To add your own guide to the project, we recommend you download the project from GitHub and setting it up on your local machine.
Follow the [Readme](README.md) instructions to get dependencies installed and run the project.

It is highly recommended to review some of the documentation of the tools we use, especially Nuxt Content and Nuxt UI.
Our [page structure](https://content.nuxt.com/usage/content-directory) follows Nuxt Content
and you can use components available from [Nuxt UI](https://ui.nuxt.com/components/accordion) including [Nuxt UI Pro](https://ui.nuxt.com/pro/components/aside).

### Create a new section for your guide

Your new guide should have its own folder under `/content/tutorials`. The minimum files your directory should have are
the `_dir.yml` and a `10.index.md`.

#### _dir.yml

The `_dir.yml` file contains the metadata that describes your guide and provides the summary at the beginning of your guide.
We recommend grabbing a copy from another guide and starting from that template.

Ensure that at a minimum you have a title, authors, tags, summary, and description defined.
Filling out the rest of the metadata is highly recommended to improve searchability and help readers understand what they can learn from your guide.

#### 10.index.md

The `10.index.md` file is the starting point of your guide.
It may be all you need but you are free to add more pages!
By adding a number at the beginning of your markdown file, it will help automatically order your pages for navigation.
The two digit number is simply a syntax choice to help make situations like re-ordering easier.

Frontmatter is required on all markdown pages. At minimum you need a title and description.
This is displayed at the beginning header for the page.
If you do not want to display a description, simply leave the `description` blank.

### Using UI components

Writing in markdown should provide you most of the basic text editing features you'll need.
However if you want to add additional UI for visual aid, you can use Nuxt UI.
The syntax is slightly different with declaring Vue components in markdown.

For example, if you use a [Nuxt UI Button component](https://ui.nuxt.com/components/button), the html syntax would be the following:

```html
<UButton color="primary" variant="solid">
  I am a button
</UButton>
```

In markdown, the syntax changes to the following:

```md
::u-button{ color="primary" variant="solid" }
  I am a button
::
```

You can refer to the Nuxt Content documentation on [Vue Components](https://content.nuxt.com/usage/markdown#vue-components)
to learn further how to customize and use vue components in markdown.
We have additional custom components aside from Nuxt UI that you can use.
You can discover these in our [zkSync Docs Contribution Styleguide](https://docs.zksync.io/build/contributing-to-documentation/documentation-styleguide#markdown-and-vue).

## 💈 Writing styleguide

Our community is diverse, made up of people from all over the globe.
This means our readers may be non-native English speakers.
To help everyone learn and grow with our Community Code,
we adhere to industry best practices to ensure inclusivity.

Check out and read through our [zkSync Docs Contribution Styleguide](https://docs.zksync.io/build/contributing-to-documentation/documentation-styleguide#writing-style)
to learn how to best write your guide for our community.

## 📥 Submitting your guide

Please [submit a PR of your branch to main on GitHub](https://github.com/zkSync-Community-Hub/community-code/compare).
Provide a clear description of what you're contributing.

## 📜 Commit conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standards.
For changes that are **code related**, use the `fix:`, `feat:`, or `chore:` tags in your commits.
For typo or document related changes, please use the `docs:` tag.

```sh
git commit -m "docs: fix typo in guide"
```
