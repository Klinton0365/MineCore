<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Branch;
use App\Models\BranchProduct;
use App\Models\ProductCountry;
use App\Models\Enquiry;
use App\Models\EnquiryItem;
use App\Models\FeaturedSchedule;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // -------------------------------------------------------
        // 1. Admin User
        // -------------------------------------------------------
        $admin = User::create([
            'name'     => 'Admin',
            'email'    => 'admin@minecore.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        // -------------------------------------------------------
        // 2. Categories (3-level hierarchy) & Products
        // -------------------------------------------------------

        // --- Underground Mining Equipment ---
        $underground = Category::create([
            'name'          => 'Underground Mining Equipment',
            'slug'          => 'underground-mining-equipment',
            'parent_id'     => null,
            'description'   => 'Heavy-duty equipment designed for underground mining operations including drilling, loading, and hauling.',
            'display_order' => 1,
            'is_active'     => true,
        ]);

        $drillRigs = Category::create([
            'name'          => 'Drill Rigs',
            'slug'          => 'drill-rigs',
            'parent_id'     => $underground->id,
            'description'   => 'Hydraulic and pneumatic drill rigs for underground face and production drilling.',
            'display_order' => 1,
            'is_active'     => true,
        ]);

        $lhd = Category::create([
            'name'          => 'Load Haul Dump (LHD)',
            'slug'          => 'load-haul-dump-lhd',
            'parent_id'     => $underground->id,
            'description'   => 'Underground loaders for loading, hauling, and dumping ore and waste rock.',
            'display_order' => 2,
            'is_active'     => true,
        ]);

        // --- Surface Mining Equipment ---
        $surface = Category::create([
            'name'          => 'Surface Mining Equipment',
            'slug'          => 'surface-mining-equipment',
            'parent_id'     => null,
            'description'   => 'Large-scale equipment for open-pit and surface mining operations.',
            'display_order' => 2,
            'is_active'     => true,
        ]);

        $excavators = Category::create([
            'name'          => 'Excavators',
            'slug'          => 'excavators',
            'parent_id'     => $surface->id,
            'description'   => 'Hydraulic mining excavators for overburden removal and ore extraction.',
            'display_order' => 1,
            'is_active'     => true,
        ]);

        $dumpTrucks = Category::create([
            'name'          => 'Dump Trucks',
            'slug'          => 'dump-trucks',
            'parent_id'     => $surface->id,
            'description'   => 'Off-highway haul trucks for transporting mined material.',
            'display_order' => 2,
            'is_active'     => true,
        ]);

        // --- Drilling & Blasting ---
        $drillingBlasting = Category::create([
            'name'          => 'Drilling & Blasting',
            'slug'          => 'drilling-blasting',
            'parent_id'     => null,
            'description'   => 'Equipment and systems for blast hole drilling and controlled blasting operations.',
            'display_order' => 3,
            'is_active'     => true,
        ]);

        $blastHoleDrills = Category::create([
            'name'          => 'Blast Hole Drills',
            'slug'          => 'blast-hole-drills',
            'parent_id'     => $drillingBlasting->id,
            'description'   => 'Rotary and DTH blast hole drill rigs for surface mining.',
            'display_order' => 1,
            'is_active'     => true,
        ]);

        $explosives = Category::create([
            'name'          => 'Explosives & Accessories',
            'slug'          => 'explosives-accessories',
            'parent_id'     => $drillingBlasting->id,
            'description'   => 'Initiation systems, bulk explosives, and blasting accessories.',
            'display_order' => 2,
            'is_active'     => true,
        ]);

        // --- Safety & PPE ---
        $safetyPpe = Category::create([
            'name'          => 'Safety & PPE',
            'slug'          => 'safety-ppe',
            'parent_id'     => null,
            'description'   => 'Personal protective equipment and safety systems for mining personnel.',
            'display_order' => 4,
            'is_active'     => true,
        ]);

        $headProtection = Category::create([
            'name'          => 'Head Protection',
            'slug'          => 'head-protection',
            'parent_id'     => $safetyPpe->id,
            'description'   => 'Hard hats, helmets, and head-mounted accessories for mine workers.',
            'display_order' => 1,
            'is_active'     => true,
        ]);

        $respiratoryProtection = Category::create([
            'name'          => 'Respiratory Protection',
            'slug'          => 'respiratory-protection',
            'parent_id'     => $safetyPpe->id,
            'description'   => 'Respirators, masks, and breathing apparatus for dust and gas protection.',
            'display_order' => 2,
            'is_active'     => true,
        ]);

        // --- Products ---
        $productsData = [
            // Drill Rigs
            [
                'name'               => 'Atlas Copco Boomer S2',
                'slug'               => 'atlas-copco-boomer-s2',
                'category_id'        => $drillRigs->id,
                'description'        => 'The Atlas Copco Boomer S2 is a two-boom electro-hydraulic face drilling rig designed for tunnels and mining drifts ranging from 16 to 68 m². It features advanced COP 1838 rock drills and an ergonomic operator cabin with RCS drill control for precise and productive drilling.',
                'specifications'     => ['weight' => '22,000 kg', 'power' => '75 kW per boom', 'capacity' => '45 mm - 64 mm hole diameter'],
                'is_featured'        => true,
                'is_product_of_week' => false,
                'featured_badge'     => 'best_seller',
                'is_active'          => true,
            ],
            [
                'name'               => 'Sandvik DD422i',
                'slug'               => 'sandvik-dd422i',
                'category_id'        => $drillRigs->id,
                'description'        => 'The Sandvik DD422i is an intelligent, fully automated two-boom jumbo drill rig built for demanding underground mining and tunneling. It integrates iSURE planning software with onboard diagnostics, enabling accurate hole placement and minimal overbreak.',
                'specifications'     => ['weight' => '24,500 kg', 'power' => '90 kW per boom', 'capacity' => '43 mm - 64 mm hole diameter'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            // Load Haul Dump (LHD)
            [
                'name'               => 'Caterpillar R1700',
                'slug'               => 'caterpillar-r1700',
                'category_id'        => $lhd->id,
                'description'        => 'The Cat R1700 underground loader delivers 15.4 tonnes of payload capacity with a low-profile design for narrow-vein mining. Its robust drivetrain and advanced hydraulics enable fast cycle times and reliable material handling in harsh underground conditions.',
                'specifications'     => ['weight' => '33,600 kg', 'power' => '275 kW (369 hp)', 'capacity' => '15.4 tonne payload'],
                'is_featured'        => false,
                'is_product_of_week' => true,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            [
                'name'               => 'Sandvik LH517i',
                'slug'               => 'sandvik-lh517i',
                'category_id'        => $lhd->id,
                'description'        => 'The Sandvik LH517i is a 17-tonne intelligent underground loader with AutoMine-ready capability. It features Sandvik OptiMine integration for real-time fleet tracking and predictive maintenance, reducing operating costs in high-production environments.',
                'specifications'     => ['weight' => '36,000 kg', 'power' => '275 kW (369 hp)', 'capacity' => '17 tonne payload'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            // Excavators
            [
                'name'               => 'Caterpillar 6060',
                'slug'               => 'caterpillar-6060',
                'category_id'        => $excavators->id,
                'description'        => 'The Cat 6060 hydraulic mining shovel is a 600-tonne class front shovel or backhoe designed for large surface mining operations. Its twin Cat C175-16 engines deliver 2 × 1,500 kW of power, making it ideal for loading ultra-class haul trucks in four to five passes.',
                'specifications'     => ['weight' => '601,000 kg', 'power' => '2 × 1,500 kW (4,020 hp)', 'capacity' => '34 m³ bucket (front shovel)'],
                'is_featured'        => true,
                'is_product_of_week' => false,
                'featured_badge'     => 'featured',
                'is_active'          => true,
            ],
            [
                'name'               => 'Komatsu PC8000-11',
                'slug'               => 'komatsu-pc8000-11',
                'category_id'        => $excavators->id,
                'description'        => 'The Komatsu PC8000-11 is an 800-tonne class hydraulic mining shovel engineered for the most demanding open-pit operations. It features Komatsu SDA16V160E-3 engines and KOMTRAX Plus monitoring for maximum uptime and fleet efficiency.',
                'specifications'     => ['weight' => '783,000 kg', 'power' => '2 × 1,250 kW (3,350 hp)', 'capacity' => '42 m³ bucket (front shovel)'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            // Dump Trucks
            [
                'name'               => 'Caterpillar 797F',
                'slug'               => 'caterpillar-797f',
                'category_id'        => $dumpTrucks->id,
                'description'        => 'The Cat 797F is the largest mechanical-drive haul truck in the Caterpillar lineup, offering a 400-short-ton payload capacity. Its Cat C175-20 engine and proven power-shift transmission deliver exceptional hauling performance in large-scale surface mines.',
                'specifications'     => ['weight' => '623,690 kg (gross)', 'power' => '2,983 kW (4,000 hp)', 'capacity' => '363 tonne payload'],
                'is_featured'        => true,
                'is_product_of_week' => false,
                'featured_badge'     => 'best_seller',
                'is_active'          => true,
            ],
            [
                'name'               => 'BelAZ 75710',
                'slug'               => 'belaz-75710',
                'category_id'        => $dumpTrucks->id,
                'description'        => 'The BelAZ 75710 is the world\'s largest haul truck with an astonishing 450-tonne payload capacity. Powered by two MTU 16V4000 diesel engines driving a Siemens AC electric-wheel system, it maximizes haulage productivity in ultra-large open-pit operations.',
                'specifications'     => ['weight' => '810,000 kg (gross)', 'power' => '2 × 1,715 kW (4,600 hp)', 'capacity' => '450 tonne payload'],
                'is_featured'        => false,
                'is_product_of_week' => true,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            // Blast Hole Drills
            [
                'name'               => 'Atlas Copco PV-271',
                'slug'               => 'atlas-copco-pv-271',
                'category_id'        => $blastHoleDrills->id,
                'description'        => 'The Atlas Copco PV-271 is a rotary blast hole drill rig designed for single-pass drilling up to 17.7 m in hard rock. Its high-torque pulldown system and auto-drill functionality deliver consistent hole quality and maximized penetration rates.',
                'specifications'     => ['weight' => '82,000 kg', 'power' => '895 kW (1,200 hp)', 'capacity' => '229 mm - 311 mm hole diameter'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            [
                'name'               => 'Sandvik DR461i',
                'slug'               => 'sandvik-dr461i',
                'category_id'        => $blastHoleDrills->id,
                'description'        => 'The Sandvik DR461i is an autonomous-ready down-the-hole (DTH) drill rig for large open-pit blast holes. Its iDrill automation platform enables remote monitoring and one-touch drilling for consistent hole accuracy and reduced operator fatigue.',
                'specifications'     => ['weight' => '71,000 kg', 'power' => '746 kW (1,000 hp)', 'capacity' => '152 mm - 229 mm hole diameter'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            // Explosives & Accessories
            [
                'name'               => 'Electronic Detonator System',
                'slug'               => 'electronic-detonator-system',
                'category_id'        => $explosives->id,
                'description'        => 'A programmable electronic blasting system that allows precise delay timing in 1 ms increments for superior blast fragmentation. The system features digital signal encoding for enhanced safety and reduced vibration in sensitive blasting environments.',
                'specifications'     => ['weight' => '85 g per unit', 'power' => '3.6V lithium cell', 'capacity' => 'Up to 30,000 ms delay range'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            [
                'name'               => 'ANFO Loading System',
                'slug'               => 'anfo-loading-system',
                'category_id'        => $explosives->id,
                'description'        => 'A truck-mounted ANFO (Ammonium Nitrate Fuel Oil) loading system designed for high-volume blast hole charging. It features a pneumatic delivery hose and precise metering to ensure consistent density and reliable detonation across the blast pattern.',
                'specifications'     => ['weight' => '14,500 kg (truck-mounted)', 'power' => '75 kW pneumatic compressor', 'capacity' => '8,000 kg ANFO hopper'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => 'featured',
                'is_active'          => true,
            ],
            // Head Protection
            [
                'name'               => 'MSA V-Gard Hard Hat',
                'slug'               => 'msa-v-gard-hard-hat',
                'category_id'        => $headProtection->id,
                'description'        => 'The MSA V-Gard is an industry-standard mining hard hat with a distinctive V-shape cap design for superior impact deflection. It features Fas-Trac III ratchet suspension for customized fit and all-day comfort in underground and surface mining environments.',
                'specifications'     => ['weight' => '370 g', 'power' => 'N/A', 'capacity' => 'ANSI/ISEA Z89.1 Type I, Class E'],
                'is_featured'        => true,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            [
                'name'               => '3M SecureFit Safety Helmet',
                'slug'               => '3m-securefit-safety-helmet',
                'category_id'        => $headProtection->id,
                'description'        => 'The 3M SecureFit X5000 series safety helmet features a patented pressure diffusion technology that distributes impact force across a wider area. Its lightweight HDPE shell and reflective accents make it ideal for 24/7 mining operations with high visibility requirements.',
                'specifications'     => ['weight' => '415 g', 'power' => 'N/A', 'capacity' => 'ANSI/ISEA Z89.1 Type I, Class C/E/G'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            // Respiratory Protection
            [
                'name'               => '3M 7800S Full Face Respirator',
                'slug'               => '3m-7800s-full-face-respirator',
                'category_id'        => $respiratoryProtection->id,
                'description'        => 'The 3M 7800S is a silicone full-face respirator providing comprehensive respiratory, eye, and face protection against dust, fumes, and toxic gases in mining. Its wide-view lens and bayonet cartridge system allow quick filter changes during shift work.',
                'specifications'     => ['weight' => '540 g', 'power' => 'N/A', 'capacity' => 'NIOSH-approved, EN 136 Class 2'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
            [
                'name'               => 'Dräger X-plore 6300',
                'slug'               => 'drager-x-plore-6300',
                'category_id'        => $respiratoryProtection->id,
                'description'        => 'The Dräger X-plore 6300 full-face mask offers a panoramic visor with an anti-fog coating for outstanding visibility underground. Its EPDM rubber construction resists chemical exposure while the five-point harness ensures a secure and leak-free seal during extended use.',
                'specifications'     => ['weight' => '480 g', 'power' => 'N/A', 'capacity' => 'EN 136 Class 3, Rd90 thread connection'],
                'is_featured'        => false,
                'is_product_of_week' => false,
                'featured_badge'     => null,
                'is_active'          => true,
            ],
        ];

        $products = [];
        foreach ($productsData as $data) {
            $products[] = Product::create($data);
        }

        // -------------------------------------------------------
        // 3. Branches
        // -------------------------------------------------------
        $bangalore = Branch::create([
            'name'          => 'Bangalore Branch',
            'region_code'   => 'IN-BLR',
            'country'       => 'India',
            'description'   => 'Main operations hub for the Indian subcontinent.',
            'address'       => 'Tech Park, Whitefield, Bangalore, Karnataka 560066',
            'is_visible'    => true,
            'display_logic' => 'Visible to India IP',
        ]);

        $dubai = Branch::create([
            'name'          => 'Dubai Branch',
            'region_code'   => 'AE-DXB',
            'country'       => 'UAE',
            'description'   => 'Regional office serving the Gulf Cooperation Council markets.',
            'address'       => 'JAFZA One Tower, Jebel Ali Free Zone, Dubai, UAE',
            'is_visible'    => true,
            'display_logic' => 'Visible to GCC IP',
        ]);

        $uk = Branch::create([
            'name'          => 'United Kingdom',
            'region_code'   => 'GB-LDN',
            'country'       => 'United Kingdom',
            'description'   => 'Enquiry-only office for the UK and European markets.',
            'address'       => '30 St Mary Axe, London EC3A 8BF, United Kingdom',
            'is_visible'    => true,
            'display_logic' => 'Enquiry Only Mode',
        ]);

        // -------------------------------------------------------
        // 4. Branch-Product Mappings
        // -------------------------------------------------------
        foreach ($products as $index => $product) {
            // Bangalore: most in_stock, products at index 3 and 7 are limited
            BranchProduct::create([
                'branch_id'    => $bangalore->id,
                'product_id'   => $product->id,
                'stock_status' => in_array($index, [3, 7]) ? 'limited' : 'in_stock',
                'is_override'  => false,
            ]);

            // Dubai: alternating pattern -- even indexes in_stock, odd indexes limited
            BranchProduct::create([
                'branch_id'    => $dubai->id,
                'product_id'   => $product->id,
                'stock_status' => ($index % 2 === 0) ? 'in_stock' : 'limited',
                'is_override'  => false,
            ]);

            // UK: indexes 0,4,8,12 out_of_stock, rest limited
            BranchProduct::create([
                'branch_id'    => $uk->id,
                'product_id'   => $product->id,
                'stock_status' => in_array($index, [0, 4, 8, 12]) ? 'out_of_stock' : 'limited',
                'is_override'  => false,
            ]);
        }

        // -------------------------------------------------------
        // 5. Product Countries
        // -------------------------------------------------------
        $countries = [
            ['code' => 'IN', 'name' => 'India'],
            ['code' => 'AE', 'name' => 'UAE'],
            ['code' => 'GB', 'name' => 'United Kingdom'],
        ];

        foreach ($products as $index => $product) {
            foreach ($countries as $country) {
                // Make a few products unavailable in UK to add variety
                $isAvailable = true;
                if ($country['code'] === 'GB' && in_array($index, [10, 11])) {
                    $isAvailable = false;
                }

                ProductCountry::create([
                    'product_id'   => $product->id,
                    'country_code' => $country['code'],
                    'country_name' => $country['name'],
                    'is_available' => $isAvailable,
                ]);
            }
        }

        // -------------------------------------------------------
        // 6. Featured Schedules
        // -------------------------------------------------------
        $today = Carbon::today();
        $nextWeek = Carbon::today()->addDays(7);

        // Products of the week are at index 2 (Caterpillar R1700) and 7 (BelAZ 75710)
        FeaturedSchedule::create([
            'product_id'     => $products[2]->id,
            'start_date'     => $today,
            'end_date'       => $nextWeek,
            'countdown_end'  => $nextWeek,
            'is_active'      => true,
        ]);

        FeaturedSchedule::create([
            'product_id'     => $products[7]->id,
            'start_date'     => $today,
            'end_date'       => $nextWeek,
            'countdown_end'  => $nextWeek,
            'is_active'      => true,
        ]);

        // -------------------------------------------------------
        // 7. Settings
        // -------------------------------------------------------
        $settings = [
            ['key' => 'site_name',              'value' => 'MineCore Global'],
            ['key' => 'contact_email',          'value' => 'info@minecoreglobal.com'],
            ['key' => 'contact_phone',          'value' => '+91 80 1234 5678'],
            ['key' => 'whatsapp_number',        'value' => '918012345678'],
            ['key' => 'sync_interval_minutes',  'value' => '30'],
            ['key' => 'company_address',        'value' => 'Tech Park, Whitefield, Bangalore, India'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }

        // -------------------------------------------------------
        // 8. Sample Enquiries (5)
        // -------------------------------------------------------
        $enquiry1 = Enquiry::create([
            'customer_name' => 'Rajesh Kumar',
            'phone'         => '+91 98765 43210',
            'email'         => 'rajesh.kumar@tatamining.in',
            'country'       => 'India',
            'message'       => 'We are expanding our underground gold mine in Karnataka and need pricing for drill rigs and LHD loaders. Please share a quotation for 3 units each.',
            'status'        => 'new',
            'ip_address'    => '103.21.125.77',
        ]);
        EnquiryItem::create(['enquiry_id' => $enquiry1->id, 'product_id' => $products[0]->id]);
        EnquiryItem::create(['enquiry_id' => $enquiry1->id, 'product_id' => $products[2]->id]);
        EnquiryItem::create(['enquiry_id' => $enquiry1->id, 'product_id' => $products[3]->id]);

        $enquiry2 = Enquiry::create([
            'customer_name' => 'Ahmed Al-Farsi',
            'phone'         => '+971 50 123 4567',
            'email'         => 'ahmed.alfarsi@gulfminerals.ae',
            'country'       => 'UAE',
            'message'       => 'Interested in the Caterpillar 797F and BelAZ 75710 for our new iron ore project in Fujairah. Need lead times and CIF Dubai pricing.',
            'status'        => 'contacted',
            'ip_address'    => '185.56.233.12',
        ]);
        EnquiryItem::create(['enquiry_id' => $enquiry2->id, 'product_id' => $products[6]->id]);
        EnquiryItem::create(['enquiry_id' => $enquiry2->id, 'product_id' => $products[7]->id]);

        $enquiry3 = Enquiry::create([
            'customer_name' => 'James Whitfield',
            'phone'         => '+44 7700 900123',
            'email'         => 'j.whitfield@cornwallmines.co.uk',
            'country'       => 'United Kingdom',
            'message'       => 'Looking for PPE bulk order: 500 hard hats and 200 full-face respirators for our tin mine reopening project in Cornwall.',
            'status'        => 'converted',
            'ip_address'    => '81.2.69.142',
        ]);
        EnquiryItem::create(['enquiry_id' => $enquiry3->id, 'product_id' => $products[12]->id]);
        EnquiryItem::create(['enquiry_id' => $enquiry3->id, 'product_id' => $products[14]->id]);
        EnquiryItem::create(['enquiry_id' => $enquiry3->id, 'product_id' => $products[15]->id]);

        $enquiry4 = Enquiry::create([
            'customer_name' => 'Priya Nair',
            'phone'         => '+91 94567 12345',
            'email'         => 'priya.nair@vedantaresources.com',
            'country'       => 'India',
            'message'       => 'Require electronic detonator systems for our copper-zinc mine in Rajasthan. Annual consumption is approximately 50,000 units.',
            'status'        => 'new',
            'ip_address'    => '49.36.128.91',
        ]);
        EnquiryItem::create(['enquiry_id' => $enquiry4->id, 'product_id' => $products[10]->id]);

        $enquiry5 = Enquiry::create([
            'customer_name' => 'Mohammed bin Saleh',
            'phone'         => '+971 55 987 6543',
            'email'         => 'm.binsaleh@saudiarabiamining.sa',
            'country'       => 'UAE',
            'message'       => 'We need blast hole drill rigs and an ANFO loading system for our phosphate mine. Kindly arrange a site demonstration.',
            'status'        => 'closed',
            'ip_address'    => '94.56.172.33',
        ]);
        EnquiryItem::create(['enquiry_id' => $enquiry5->id, 'product_id' => $products[8]->id]);
        EnquiryItem::create(['enquiry_id' => $enquiry5->id, 'product_id' => $products[9]->id]);
        EnquiryItem::create(['enquiry_id' => $enquiry5->id, 'product_id' => $products[11]->id]);
    }
}
