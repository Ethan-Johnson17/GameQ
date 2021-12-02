<template>
  <div class="row justify-content-center">
    <div class="col-md-10 card">
      <div class="row justify-content-center">
        <div class="col-md-8 text-dark text-center">
          <!-- //NOTE bind date and time of active game here -->
          <h3>Date and time</h3>
        </div>
        <div class="row">
          <div class="col-md-8 mt-3">
            <h3>Vote on the Game(s) to play!</h3>
          </div>
          <!-- //NOTE Voting area will vfor over game Q for active game need to
              also decide on style of selection input like checkbox style or
              toggle button etc. -->
          <div class="col-md-8">
            <div class="row">
              <div class="col">
                <input type="checkbox" name="game" id="game" />
                <label class="ms-3" for="game">(Game Name)</label>
              </div>
            </div>
            <!-- NOTE these are just example wont be needed -->
            <div class="row">
              <div class="col">
                <input type="checkbox" name="game" id="game" />
                <label class="ms-3" for="game">(Game Name)</label>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="checkbox" name="game" id="game" />
                <label class="ms-3" for="game">(Game Name)</label>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-10 bg-primary mb-3">
                <div class="row">
                  <div class="col text-center mt-3">
                    <h3><b>Total Votes</b></h3>
                    <hr />
                  </div>
                </div>
                <!-- //NOTE vfor -->
                <div class="row">
                  <div class="col-9 my-2">(Game Name)</div>
                  <div class="col-3 my-2">(Votes)</div>
                  <!-- NOTE Dont need these (for example) -->
                  <div class="col-9 my-2">(Game Name)</div>
                  <div class="col-3 my-2">(Votes)</div>
                  <div class="col-9 my-2">(Game Name)</div>
                  <div class="col-3 my-2">(Votes)</div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col">
                <h2>Who is bring what..</h2>
              </div>
            </div>
            <!-- NOTE Vfor -->
            <div class="row">
              <div class="col my-2">
                <ul>
                  <li>Item: Name of whos bringing it</li>
                </ul>
              </div>
            </div>
            <!-- NOTE wont need these are examples  -->
            <div class="row">
              <div class="col my-3">
                <ul>
                  <li>Item: Name of whos bringing it</li>
                </ul>
              </div>
            </div>
            <div class="row">
              <div class="col my-3">
                <ul>
                  <li>Item: Name of whos bringing it</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>