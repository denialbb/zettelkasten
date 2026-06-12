---

# AWACS

AWACS is the primary sensor manager, understand **BRAA** vs. **Bullseye**.

#### **Key Request Types**

1. **Request Picture:**
    - **You ask:** _"Chalice, Cowboy 1, Request Picture."_
    - **Meaning:** "Tell me where _all_ the bad guys are."
    - **Response:** _"Cowboy 1, Chalice, Picture is 2 groups. Group 1, Bullseye 300, 40 miles, 20 thousand, Track South."_
2. **Bogey Dope:**
    - **You ask:** _"Chalice, Cowboy 1, Bogey Dope."_
    - **Meaning:** "Tell me the _closest_ enemy to _me_ right now."
    - **Response:** _"Cowboy 1, Chalice, Group BRAA 090, 20 miles, 15 thousand, Hot."_ (Bearing 090, Range 20, Altitude 15k, flying toward you).
3. **Declare:**
    - **You ask:** _"Chalice, Cowboy 1, Declare target, Bullseye 240, 15."_ (Or use "Declare" while locking a target on radar).
    - **Response:**
        - **"Friendly"** (Don't shoot).
        - **"Hostile"** (Free to shoot).
        - **"Bogey"** (Unknown, proceed with caution).
        - **"Outlaw"** (Bogey meeting origin point criteria).

#### **Brevity Codes (The "Dictionary")**

- **Bullseye:** A fixed reference point on the map. All coordinates are given as "Bearing _from_ Bullseye, Range _from_ Bullseye."
- **BRAA:** Bearing, Range, Altitude, Aspect (relative to _your_ nose).
- **Spike:** RWR indication of an enemy AI radar locking you. _"Spike 12 o'clock!"_
- **Nails:** RWR indication of search radar (not locking yet).
- **Mud:** Ground radar (SAM) indication on RWR. _"Mud 3 o'clock."_
- **Singer:** RWR indication of a SAM launch.
- **Faded:** Radar contact lost.

---

### **Part 3: Wingman Communications**

Controlling AI wingmen in BMS is vital for survival. You issue commands via the UHF radio menu (usually `Q` or `W` keys).

#### **Essential Commands**

1. **Formation Management:**
    - **"Go Spread":** Tells wingman to fly 1-2 miles abeam you. Essential for combat to confuse enemy radar.
    - **"Rejoin":** Bring them back to close formation (fingertip).
2. **Sensor Management:**
    - **"Radar On/Off":** Keep them silent until needed ("Fence In").
3. **Combat Commands:**
    - **"Attack my Target":** Wingman engages the specific target you have locked.
    - **"Weapons Free":** Wingman engages any hostile they see. **Dangerous** if you haven't confirmed Friend/Foe.
    - **"Clear my Six":** Wingman checks behind you and engages threats.
4. **Status Checks:**
    - **"Raygun":** You are locking someone to ID them. If your wingman screams _"Buddy Spike!"_ unlock immediately; you are locking him.
    - **"Check Fuel":** Wingman replies with fuel state (e.g., _"Two is 6.5"_ = 6,500 lbs).

---

### Checklist

#### **I. PRE-TAXI & TAKEOFF**

- [ ] **UHF:** Set to Ground Freq.
- [ ] **VHF:** Set to Flight/Package Freq.
- [ ] **Request Taxi:** _"Request Taxi"_ -> Note Runway & Route.
- [ ] **Taxi:** Adhere to speed (20kts straight, 10kts turns).
- [ ] **Arm Ejection Seat:** Prior to runway entry.
- [ ] **Hold Short:** Switch to Tower Freq.
- [ ] **Request Departure:** _"Ready for Departure."_
- [ ] **Line Up/Takeoff:** Confirm specific clearance.

#### **II. FENCE IN (Entering Combat Zone)**

- [ ] **Master Arm:** ARM.
- [ ] **Lights:** OFF (External).
- [ ] **Countermeasures:** Set program (e.g., PRGM 1).
- [ ] **Radar:** ON.
- [ ] **AWACS Check:** _"Request Picture"_.
- [ ] **Wingman:** Command _"Go Spread"_.

#### **III. COMBAT CHECKS (A/A)**

- [ ] **Target Locked?** IFF Interrogate (Alt usually).
- [ ] **Not confirmed?** Ask AWACS: _"Declare."_
- [ ] **Firing Radar Missile:** Call _"Fox 3"_ (Active) or _"Fox 1"_ (Semi-Active).
- [ ] **Firing Heatseeker:** Call _"Fox 2"_.
- [ ] **Defensive:** If Spiked -> _"Chaff/Flare"_ -> Notch (Place threat on 3/9 line).

#### **IV. RECOVERY (RTB)**

- [ ] **FENCE OUT:** Master Arm SAFE, Lights as required.
- [ ] **AWACS:** Optional "Request Relief" or just navigate home.
- [ ] **Inbound:** Switch to Approach Freq ~30nm out.
- [ ] **Call:** _"Inbound for landing."_
- [ ] **Approach Type:** Visual, ILS, or Overhead.
- [ ] **Gear:** Down below 250kts.
- [ ] **Final:** Call _"Tower, [Callsign], Final."_
- [ ] **Clear Runway:** Don't stop until past the hold short line.

---

### **V. BREVITY "CHEAT SHEET"**

|**Code**|**Meaning**|
|---|---|
|**Tally**|Visual sighting of **Enemy**.|
|**Visual**|Visual sighting of **Friendly**.|
|**No Joy**|Cannot see the Enemy.|
|**Blind**|Cannot see the Friendly/Wingman.|
|**Winchester**|Out of ammo.|
|**Bingo**|Reached fuel state to return home.|
|**Joker**|Fuel state above Bingo, but time to start wrapping up.|
|**Fox 1/2/3**|Radar (Semi) / Heat / Radar (Active) missile launch.|
|**Pickle**|Bomb release.|
|**Rifle**|Maverick launch.|
|**Magnum**|HARM (Anti-Radiation) launch.|
|**Splash**|Target destroyed (Air-to-Air).|
|**Shack**|Target destroyed (Air-to-Ground).|

# Comms Ladder
![[Pasted image 20260212111004.png]]
This is a **Communication Ladder** for a typical Falcon BMS mission departing from **Kunsan Air Base (RKJK)**.

This simulation follows the "crawl, walk, run" progression of a flight: **Ground -> Tower -> Departure -> Tactical (AWACS) -> Approach -> Ground.**

### **Mission Profile**

- **Callsign:** Cowboy 1-1, Cowboy 1-2.
- **Location:** Kunsan AB (RKJK).
- **Task:** CAP (Combat Air Patrol).
- **Frequencies:**
    - **UHF 2:** Kunsan Ground
    - **UHF 3:** Kunsan Tower
    - **UHF 4:** Kunsan Departure/Approach
    - **UHF 6:** Tactical (AWACS - "Chalice")
    - **VHF 15:** Victor 15 (Intra-flight)

---

### **Phase 1: Ground Operations**

**Frequency:** UHF 2 (Ground) / VHF 15 (Flight)

1. **Radio Check (Internal)**
    - **Cowboy 1-1 (You):** "Cowboy 1, radio check Victor."
    - **Cowboy 1-2 (AI):** "Two." (This confirms he hears you).
2. **Request Taxi**
    - **Cowboy 1-1:** "Kunsan Ground, Cowboy 1-1, request taxi."
    - **Kunsan Ground:** "Cowboy 1-1, Kunsan Ground. Taxi to Runway 36 via Golf, Alpha. Altimeter 2992. Winds 340 at 8."
3. **Taxiing**
    - _Action:_ Release parking brake, taxi to the hold short line of Runway 36.
    - _Action:_ As you approach the "hammerhead" (end of runway), stop.
4. **Frequency Change**
    - _Action:_ Switch UHF to 3 (Tower).

---

### **Phase 2: Takeoff & Departure**

**Frequency:** UHF 3 (Tower) -> UHF 4 (Departure)

5. **Request Departure**
    - **Cowboy 1-1:** "Kunsan Tower, Cowboy 1-1, ready for departure, Runway 36."
    - **Kunsan Tower:** "Cowboy 1-1, Kunsan Tower. Winds 350 at 10. Runway 36, cleared for takeoff."
6. **Takeoff Roll**
    - _Action:_ Advance throttle to Afterburner. Rotate at 150 kts. Gear up.
    - **Cowboy 1-1 (Internal):** "Cowboy 1, rolling."
7. **Hand-off**
    - **Kunsan Tower:** "Cowboy 1-1, contact Departure."
    - **Cowboy 1-1:** "Switching Departure, Cowboy 1-1."
    - _Action:_ Switch UHF to 4.
8. **Check-in with Departure**
    - **Cowboy 1-1:** "Kunsan Departure, Cowboy 1-1, passing 2,000 for 15,000."
    - **Kunsan Departure:** "Cowboy 1-1, Kunsan Departure. Radar contact. Climb and maintain Flight Level 220. Resume own navigation."

---

### **Phase 3: Tactical Area (The Fight)**

**Frequency:** UHF 6 (AWACS - Chalice) / VHF 15 (Wingman)

9. **Frequency Change & Check-in**
    - _Action:_ Switch UHF to 6.
    - **Cowboy 1-1:** "Chalice, Cowboy 1-1, checking in as fragged. Request Picture."
    - **Chalice (AWACS):** "Cowboy 1-1, Chalice. Picture is clear." (Or they might give you a BRAA).
10. **Fence In (Combat Prep)**
    - **Cowboy 1-1 (Internal):** "Cowboy 1, Fence In."
    - _Action:_ Master Arm ON, Radar ON, Jammer ON.
    - **Cowboy 1-1 (Internal):** "Two, Go Spread." (Visual formation change).
11. **Engagement (Simulation)**
    - _Scenario:_ You see a blip on radar.
    - **Cowboy 1-1:** "Chalice, Cowboy 1, Declare target Bullseye 270, 40."
    - **Chalice:** "Cowboy 1, Chalice. Target Hostile."
    - _Action:_ You fire an AIM-120.
    - **Cowboy 1-1:** "Cowboy 1, Fox 3!"
    - _Action:_ Missile hits.
    - **Cowboy 1-1:** "Cowboy 1, Splash one."

---

### **Phase 4: Return to Base (RTB)**

**Frequency:** UHF 4 (Approach) -> UHF 3 (Tower)

12. **Fence Out**
    - _Action:_ Master Arm OFF.
    - **Cowboy 1-1 (Internal):** "Cowboy 1, Fence Out. Two, Rejoin."
13. **Inbound Call**
    - _Action:_ Switch UHF to 4 (Approach).
    - **Cowboy 1-1:** "Kunsan Approach, Cowboy 1-1, inbound for landing."
    - **Kunsan Approach:** "Cowboy 1-1, fly heading 160. Descend and maintain 3,000. Expect Vector to Visual Runway 36."
    - _Note:_ Follow their headings! They will guide you around traffic.
14. **Approach Clearance**
    - **Kunsan Approach:** "Cowboy 1-1, turn left heading 360. 8 miles from touchdown. Contact Tower."
    - **Cowboy 1-1:** "Switching Tower, Cowboy 1-1."
15. **Landing Clearance**
    - _Action:_ Switch UHF to 3 (Tower).
    - **Cowboy 1-1:** "Kunsan Tower, Cowboy 1-1, request landing."
    - **Kunsan Tower:** "Cowboy 1-1, winds calm. Check wheels down. Runway 36, cleared to land."

---

### **Phase 5: Taxi & Shutdown**

**Frequency:** UHF 2 (Ground)

16. **Runway Exit**
    - _Action:_ Touch down, slow to <20 kts, turn off at a taxiway.
    - **Cowboy 1-1:** "Kunsan Tower, Cowboy 1-1, clear of the active."
    - **Kunsan Tower:** "Cowboy 1-1, contact Ground."
17. **Taxi to Parking**
    - _Action:_ Switch UHF to 2 (Ground).
    - **Cowboy 1-1:** "Kunsan Ground, Cowboy 1-1, clear of active, request taxi to parking."
    - **Kunsan Ground:** "Cowboy 1-1, taxi to parking."

### **Practice Script**

> **1. GROUND (UHF 2)**
> 
> "Kunsan Ground, Cowboy 1-1, Request Taxi."
> 
> _(Listen for Runway Assignment)_
> 
> **2. TOWER (UHF 3) - At Hold Short**
> 
> "Kunsan Tower, Cowboy 1-1, Ready for Departure."
> 
> _(Wait for "Cleared for Takeoff")_
> 
> **3. DEPARTURE (UHF 4) - In Air**
> 
> "Kunsan Departure, Cowboy 1-1, Passing [Altitude] for [Assigned Alt]."
> 
> **4. AWACS (UHF 6) - At Waypoint 2/3**
> 
> "Chalice, Cowboy 1-1, Request Picture."
> 
> "Chalice, Cowboy 1-1, Declare [Bullseye coords]."
> 
> **5. WINGMAN (VHF 15)**
> 
> "Two, Go Spread."
> 
> "Two, Attack my target."
> 
> "Two, Rejoin."
> 
> **6. APPROACH (UHF 4) - 30nm from base**
> 
> "Kunsan Approach, Cowboy 1-1, Inbound for landing."
> 
> _(Follow headings)_
> 
> **7. TOWER (UHF 3) - On Final**
> 
> "Kunsan Tower, Cowboy 1-1, Request Landing."
> 
> **8. GROUND (UHF 2) - After exiting runway**
> 
> "Kunsan Ground, Cowboy 1-1, Request taxi to parking."
