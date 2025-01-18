use alloy_sol_types::sol;
use serde::{Deserialize, Serialize};

sol! {
    /// The public values encoded as a struct that can be easily deserialized inside Solidity.
    struct PublicValuesStruct {
        uint32 blocksDestroyed;
        uint32 timeElapsed;
        bool isValid;
    }
}

pub const BOTTOM_WALL: f32 = -300.0;
pub const TOP_WALL: f32 = 300.0;
pub const LEFT_WALL: f32 = -435.0;
pub const RIGHT_WALL: f32 = 435.0;
pub const SCREEN_WIDTH: f32 = RIGHT_WALL - LEFT_WALL;
pub const SCREEN_HEIGHT: f32 = TOP_WALL - BOTTOM_WALL;

pub const BALL_SIZE: f32 = 30.0;
pub const PADDLE_WIDTH: f32 = 120.0;
pub const PADDLE_HEIGHT: f32 = 20.0;
pub const PADDLE_SPEED: f32 = 500.0;
pub const BALL_SPEED: f32 = 300.0;
pub const BRICK_WIDTH: f32 = 100.0;
pub const BRICK_HEIGHT: f32 = 30.0;

pub const GAP_BETWEEN_PADDLE_AND_FLOOR: f32 = 60.0;
pub const PADDLE_Y: f32 = BOTTOM_WALL + GAP_BETWEEN_PADDLE_AND_FLOOR;

pub const GAP_BETWEEN_PADDLE_AND_BRICKS: f32 = 270.0;
pub const GAP_BETWEEN_BRICKS: f32 = 5.0;
pub const GAP_BETWEEN_BRICKS_AND_CEILING: f32 = 20.0;
pub const GAP_BETWEEN_BRICKS_AND_SIDES: f32 = 20.0;

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum Controls {
    Left,
    Right,
    None,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Action {
    pub direction: Controls,
    pub count: u32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Vec2 {
    pub x: f32,
    pub y: f32,
}

impl Vec2 {
    pub fn new(x: f32, y: f32) -> Self {
        Self { x, y }
    }

    pub fn normalize(&self) -> Self {
        let length = (self.x * self.x + self.y * self.y).sqrt();
        if length != 0.0 {
            Self {
                x: self.x / length,
                y: self.y / length,
            }
        } else {
            self.clone()
        }
    }
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Ball {
    pub pos: Vec2,
    pub vel: Vec2,
}

impl Ball {
    pub fn new() -> Self {
        let direction = Vec2::new(0.5, -0.5).normalize();
        Self {
            pos: Vec2::new(0.0, 10.0),
            vel: Vec2::new(direction.x * BALL_SPEED, direction.y * BALL_SPEED),
        }
    }

    pub fn update(&mut self, dt: f32) {
        self.pos.x += self.vel.x * dt;
        self.pos.y += self.vel.y * dt;
    }
}

impl Default for Ball {
    fn default() -> Self {
        Self::new()
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Paddle {
    pub pos: Vec2,
}

impl Paddle {
    pub fn new() -> Self {
        Self {
            pos: Vec2::new(0.0, PADDLE_Y),
        }
    }

    pub fn move_horizontal(&mut self, direction: Controls, dt: f32) {
        let move_amount = match direction {
            Controls::Left => -PADDLE_SPEED * dt,
            Controls::Right => PADDLE_SPEED * dt,
            Controls::None => 0.0,
        };

        let new_x = self.pos.x + move_amount;
        let half_paddle = PADDLE_WIDTH / 2.0;
        let left_bound = LEFT_WALL + half_paddle;
        let right_bound = RIGHT_WALL - half_paddle;

        self.pos.x = new_x.clamp(left_bound, right_bound);
    }
}

impl Default for Paddle {
    fn default() -> Self {
        Self::new()
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Brick {
    pub pos: Vec2,
    pub active: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum GameMode {
    Live,
    Replay,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameState {
    pub ball: Ball,
    pub paddle: Paddle,
    pub bricks: Vec<Brick>,
    pub score: u32,
    pub time_elapsed: f32,
    pub start_time: Option<f32>,
    pub game_over: bool,
    mode: GameMode,
    action_log: Vec<Action>,
    current_action: Option<Action>,
    frame_count: u32,
}

fn create_bricks() -> Vec<Brick> {
    let mut bricks = Vec::new();

    // Copied brick layout logic from original game
    let total_width = (RIGHT_WALL - LEFT_WALL) - 2.0 * GAP_BETWEEN_BRICKS_AND_SIDES;
    let bottom_edge = PADDLE_Y + GAP_BETWEEN_PADDLE_AND_BRICKS;
    let total_height = TOP_WALL - bottom_edge - GAP_BETWEEN_BRICKS_AND_CEILING;

    let n_columns = (total_width / (BRICK_WIDTH + GAP_BETWEEN_BRICKS)).floor() as i32;
    let n_rows = (total_height / (BRICK_HEIGHT + GAP_BETWEEN_BRICKS)).floor() as i32;

    let center = (LEFT_WALL + RIGHT_WALL) / 2.0;
    let left_edge = center
        - (n_columns as f32 / 2.0 * BRICK_WIDTH)
        - ((n_columns - 1) as f32 / 2.0 * GAP_BETWEEN_BRICKS);

    for row in 0..n_rows {
        for col in 0..n_columns {
            bricks.push(Brick {
                pos: Vec2::new(
                    left_edge + BRICK_WIDTH / 2.0 + col as f32 * (BRICK_WIDTH + GAP_BETWEEN_BRICKS),
                    bottom_edge
                        + BRICK_HEIGHT / 2.0
                        + row as f32 * (BRICK_HEIGHT + GAP_BETWEEN_BRICKS),
                ),
                active: true,
            });
        }
    }

    bricks
}

impl GameState {
    pub fn new(mode: GameMode) -> Self {
        Self {
            ball: Ball::new(),
            paddle: Paddle::new(),
            bricks: create_bricks(),
            score: 0,
            time_elapsed: 0.0,
            start_time: None,
            game_over: false,
            mode,
            action_log: Vec::new(),
            current_action: None,
            frame_count: 0,
        }
    }

    pub fn update(&mut self, input: Controls, dt: f32) {
        if self.game_over {
            return;
        }

        match self.mode {
            GameMode::Live => self.record_action(input),
            GameMode::Replay => {}
        }

        const EPSILON: f32 = 0.000001;

        if self.start_time.is_none() {
            self.start_time = Some(0.0);
        }

        self.time_elapsed += dt;
        self.paddle.move_horizontal(input, dt);
        self.ball.update(dt);

        // Ball collision with walls - copied from original
        if self.ball.pos.x <= LEFT_WALL || self.ball.pos.x >= RIGHT_WALL {
            self.ball.vel.x = -self.ball.vel.x;
        }
        if self.ball.pos.y >= TOP_WALL {
            self.ball.vel.y = -self.ball.vel.y;
        }

        // Game over condition - copied from original
        if self.ball.pos.y < PADDLE_Y - PADDLE_HEIGHT {
            self.game_over = true;
            return;
        }

        // Ball collision with paddle
        let ball_in_paddle_x = self.ball.pos.x >= self.paddle.pos.x - PADDLE_WIDTH / 2.0
            && self.ball.pos.x <= self.paddle.pos.x + PADDLE_WIDTH / 2.0;
        let ball_in_paddle_y = self.ball.pos.y <= self.paddle.pos.y + PADDLE_HEIGHT / 2.0
            && self.ball.pos.y >= self.paddle.pos.y - PADDLE_HEIGHT / 2.0;

        if ball_in_paddle_x && ball_in_paddle_y && self.ball.vel.y < 0.0 {
            let relative_intersect_x = (self.paddle.pos.x - self.ball.pos.x) / (PADDLE_WIDTH / 2.0);
            let bounce_angle = relative_intersect_x * std::f32::consts::PI / 3.0;

            let speed =
                (self.ball.vel.x * self.ball.vel.x + self.ball.vel.y * self.ball.vel.y).sqrt();

            self.ball.vel.x = -speed * bounce_angle.sin();
            self.ball.vel.y = speed * bounce_angle.cos().abs();
        }

        // Ball collision with bricks
        for brick in &mut self.bricks {
            if !brick.active {
                continue;
            }

            let half_width = BRICK_WIDTH / 2.0;
            let half_height = BRICK_HEIGHT / 2.0;

            let ball_in_brick_x = (self.ball.pos.x + EPSILON) >= (brick.pos.x - half_width)
                && (self.ball.pos.x - EPSILON) <= (brick.pos.x + half_width);
            let ball_in_brick_y = (self.ball.pos.y + EPSILON) >= (brick.pos.y - half_height)
                && (self.ball.pos.y - EPSILON) <= (brick.pos.y + half_height);

            if ball_in_brick_x && ball_in_brick_y {
                brick.active = false;
                self.score += 1;

                let dx = (self.ball.pos.x - brick.pos.x).abs() / BRICK_WIDTH;
                let dy = (self.ball.pos.y - brick.pos.y).abs() / BRICK_HEIGHT;

                if dx > dy {
                    self.ball.vel.x = -self.ball.vel.x;
                } else {
                    self.ball.vel.y = -self.ball.vel.y;
                }
            }
        }

        self.frame_count += 1;
    }

    fn record_action(&mut self, input: Controls) {
        match &mut self.current_action {
            Some(action) if action.direction == input => {
                action.count += 1;
            }
            _ => {
                if let Some(completed_action) = self.current_action.take() {
                    self.action_log.push(completed_action);
                }
                self.current_action = Some(Action {
                    direction: input,
                    count: 1,
                });
            }
        }
    }

    pub fn get_recorded_actions(&mut self) -> Vec<Action> {
        let mut actions = self.action_log.clone();
        if let Some(final_action) = self.current_action.take() {
            actions.push(final_action);
        }
        actions
    }

    pub fn get_results(&self) -> (u32, f32) {
        (self.score, self.time_elapsed)
    }

    pub fn verify_replay(
        actions: Vec<Action>,
        elapsed_time_count: f32,
        total_bricks_hit: u32,
    ) -> bool {
        let mut game = GameState::new(GameMode::Replay);
        let dt = 1.0 / 60.0; // Fixed timestep

        for action in actions {
            for _ in 0..action.count {
                game.update(action.direction, dt);
            }
        }

        let final_results = game.get_results();
        let score_matches = final_results.0 == total_bricks_hit;
        let time_matches = (final_results.1 - elapsed_time_count).abs() < 0.1;
        score_matches && time_matches
    }
}
