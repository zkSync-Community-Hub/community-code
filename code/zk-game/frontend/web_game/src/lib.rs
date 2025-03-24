use game_lib::*;

use std::cell::RefCell;
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};

#[wasm_bindgen]
pub struct GameWrapper {
    game: Rc<RefCell<GameState>>,
    context: CanvasRenderingContext2d,
}

#[wasm_bindgen]
impl GameWrapper {
    #[wasm_bindgen(constructor)]
    pub fn new(canvas: HtmlCanvasElement) -> Result<GameWrapper, JsValue> {
        let context = canvas
            .get_context("2d")?
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()?;

        Ok(GameWrapper {
            game: Rc::new(RefCell::new(GameState::new(GameMode::Live))),
            context,
        })
    }

    pub fn play_again(&mut self) -> Result<(), JsValue> {
        let new_game = GameState::new(GameMode::Live);
        self.game.replace_with(|_| new_game);

        self.render()?;

        Ok(())
    }

    pub fn update(&mut self, input: JsValue, game_started: bool) -> Result<(), JsValue> {
        if game_started {
            const FIXED_DT: f32 = 1.0 / 60.0;

            let control: Controls = serde_wasm_bindgen::from_value(input)?;
            self.game.borrow_mut().update(control, FIXED_DT);
        }

        self.render()?;

        Ok(())
    }

    pub fn get_recorded_actions(&mut self) -> JsValue {
        let actions = self.game.borrow_mut().get_recorded_actions();
        serde_wasm_bindgen::to_value(&actions).unwrap()
    }

    pub fn render(&self) -> Result<(), JsValue> {
        let game = self.game.borrow();
        let ctx = &self.context;

        // Black canvas
        ctx.set_fill_style_str("#000");
        ctx.fill_rect(0.0, 0.0, SCREEN_WIDTH.into(), SCREEN_HEIGHT.into());

        // Transform coordinates to match game space
        // Map game coordinates to screen coordinates
        let to_screen_x = |x: f32| -> f32 { x - LEFT_WALL };
        let to_screen_y = |y: f32| -> f32 { SCREEN_HEIGHT - (y - BOTTOM_WALL) };

        // Draw paddle
        ctx.set_fill_style_str("#FFF");
        ctx.fill_rect(
            to_screen_x(game.paddle.pos.x - PADDLE_WIDTH / 2.0).into(),
            to_screen_y(game.paddle.pos.y + PADDLE_HEIGHT / 2.0).into(),
            PADDLE_WIDTH.into(),
            PADDLE_HEIGHT.into(),
        );

        // Draw ball
        ctx.begin_path();
        ctx.set_fill_style_str("#FFF");
        ctx.arc(
            to_screen_x(game.ball.pos.x).into(),
            to_screen_y(game.ball.pos.y).into(),
            (BALL_SIZE / 2.0).into(),
            0.0,
            2.0 * std::f64::consts::PI,
        )?;
        ctx.fill();

        // Draw bricks
        ctx.set_fill_style_str("#FFF");
        for brick in &game.bricks {
            if brick.active {
                ctx.fill_rect(
                    to_screen_x(brick.pos.x - BRICK_WIDTH / 2.0).into(),
                    to_screen_y(brick.pos.y + BRICK_HEIGHT / 2.0).into(),
                    BRICK_WIDTH.into(),
                    BRICK_HEIGHT.into(),
                );
            }
        }

        // Draw score
        ctx.set_fill_style_str("#FFF");
        ctx.set_font("24px VT323");
        ctx.fill_text(&format!("Score: {}", game.score), 10.0, 24.0)?;

        if game.game_over {
            ctx.set_font("48px VT323");
            ctx.set_fill_style_str("#FFF");
            ctx.fill_text(
                "Game Over!",
                (SCREEN_WIDTH / 2.0 - 100.0).into(),
                (SCREEN_HEIGHT / 2.0 + 20.).into(),
            )?;
        }

        Ok(())
    }

    pub fn is_game_over(&self) -> bool {
        self.game.borrow().game_over
    }

    pub fn get_results(&self) -> JsValue {
        let (score, time) = self.game.borrow().get_results();
        serde_wasm_bindgen::to_value(&(score, time)).unwrap()
    }
}
